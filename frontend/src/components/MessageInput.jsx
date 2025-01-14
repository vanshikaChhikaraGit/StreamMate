import React, { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import toast from 'react-hot-toast'
import { Image,Loader,Loader2,Send,X } from 'lucide-react'

const MessageInput = () => {
    const [text,setText] = useState("")
    const [imagePreview,setImagePreview] = useState(null)
    const fileInputRef = useRef(null)
    const { sendMessages,isSendingMessage } = useChatStore()

    const handleImageChange = (e)=>{
        const file = e.target.files[0]
        if(!file.type.startsWith("image/")){
            toast.error("Please select an image file")
            return;
        }
        const reader = new FileReader()
        reader.onloadend = ()=>{
            setImagePreview(reader.result)
        }

        reader.readAsDataURL(file)

    }

    const removeImage = ()=>{
        setImagePreview(null)
        if(fileInputRef.current) fileInputRef.current.value="";
    }

    const handleSendMessage = async(e)=>{
        e.preventDefault();
       if(!text.trim()&&!imagePreview){
        return;
       }
        try {
            await sendMessages({
                text: text.trim(),
                image: imagePreview
            })
            // Clear form
            setText("");
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            console.log(error)
            toast.error("Couldn't send message")
        }
    }
  return (
    <div className='w-full p-4'>
        {imagePreview&&(
            <div className='mb-3 flex items-center gap-2'>
                <div className='relative'>
                <img src={imagePreview} alt='preview' className='size-20 object-cover rounded-lg border border-zinc-700'></img>
                <button onClick={removeImage} className='absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center' type='button'><X className="size-3"></X>
              </button>
                </div>
            </div>

        )}
        <form onSubmit={handleSendMessage} className='flex items-center gap-2'>
            <div className='flex-1 flex gap-2'>
            <input type='text' value={text}  className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."onChange={(e)=>setText(e.target.value)}>
            </input>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange}></input>
            <button onClick={()=>fileInputRef.current?.click()} type="button" className={`hidden sm:flex btn btn-circle ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`} ><Image></Image></button>
            </div>
            {isSendingMessage?<Loader className='animate-spin'></Loader> :<button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagePreview}>
          <Send size={22} />
        </button>}
           
        </form>
    </div>
  )
}

export default MessageInput