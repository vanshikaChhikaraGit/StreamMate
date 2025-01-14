import cloudinary from "../lib/cloudinary.js"
import { getRecieverSocketId, io } from "../lib/socket.js"
import Message from "../models/message.model.js"
import User from "../models/user.model.js"

export const getUsersForSidebar = async (req,res)=>{
    try {
        const loggedInUserId = req.user._id
       const filteredUsers = await User.find({_id:{$ne: loggedInUserId}}).select("-password")

        return res.status(200).json(filteredUsers)
       
    } catch (error) {
        console.log("error in the get users for sidebar controller "+ error.message)
        return res.status(500).json({message:"internal server error"})
    }
       
}

export const getMessages = async (req,res)=>{
    //find msgs of current user and user whose chat is selected
try {
   const { id:userToChatId } = req.params
   const senderID = req.user._id

   const messages = await Message.find({
    $or:[
        { senderId:senderID,recieverId:userToChatId },
        { senderId:userToChatId,recieverId:senderID },
    ]
   });

    return res.status(200).json(messages)
   
} catch (error) {
    console.log("error in the get messages controller "+ error.message)
    return res.status(500).json({message:"internal server error"})
}
}

export const sendMessage = async (req,res)=>{
    try {
    const { text,image } = req.body
    const recieverId = req.params.id
    const senderId = req.user._id
    
    let imageUrl
    if(image){
        const uploadResponse = await cloudinary.uploader.upload(image)
        imageUrl = uploadResponse.secure_url
    }

    const newMessage = new Message({
        senderId,
        recieverId,
        text,
        image:imageUrl
    })

    await newMessage.save()

    const recieverSocketId = getRecieverSocketId(recieverId)
    if(recieverSocketId){
        io.to(recieverSocketId).emit("newMessage",newMessage)
    }

    return res.status(201).json(newMessage)

    } catch (error) {
        console.log("error in the send messages controller "+ error.message)
        return res.status(500).json({message:"internal server error"})
    }
    
}