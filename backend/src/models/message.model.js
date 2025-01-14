import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    recieverId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    text:{
        type:String,
    },
    image:{
        type:String
    },
    },
    {timestamps:true}
)

const Message = new mongoose.model("Message",messageSchema)

export default Message;