import React, { useEffect, useRef } from 'react'
import MessageSkeleton from './skeletons/messageSkeleton';
import { useChatStore } from '../store/useChatStore';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import { useAuthStore } from '../store/useAuthStore';
import { formatMessageTime } from '../lib/utils';

const ChatContainer = () => {
  const { messages,getMessages,isMessagesLoading,selectedUser,subscribeToMessages,unsubscribeFromMessages } = useChatStore();
  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);

  useEffect(()=>{
    getMessages(selectedUser._id)
    subscribeToMessages()
    return ()=>unsubscribeFromMessages()
  },[selectedUser._id,getMessages,unsubscribeFromMessages,subscribeToMessages])

  useEffect(()=>{
    if(messagesEndRef.current&&messages){
     messagesEndRef.current.scrollIntoView({ 
      behaviour:"smooth" ,
      block: "nearest", 
      inline: "nearest",
     })
    }
  },[messages])

  if(isMessagesLoading) return (
    <div className='overflow-auto flex flex-1 flex-col'>
      <ChatHeader></ChatHeader>
  <MessageSkeleton></MessageSkeleton>
  <MessageInput></MessageInput>
  </div>)
  return (
    <div className='overflow-auto flex flex-1 flex-col'>
      <ChatHeader />
      <div className='overflow-y-auto flex-1 space-y-4 p-4'>
        {messages.map((message)=>(
          <div key={message._id} className={`chat ${message.senderId===authUser._id?"chat-end":"chat-start"}`} ref={messagesEndRef}>
          {/* logo */}
           <div className='chat-image avatar'> 
            <div className='rounded-full border size-10'>
              <img src={message.senderId===authUser._id? authUser.profilePic||"/avatar.png":selectedUser.profilePic||"/avatar.png"}  alt="profile pic"></img>
               </div>
           </div>
           {/* time */}
           <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            {/* chats */}
            <div className='chat-bubble flex flex-col'>
              {message.image&&(
               <img
               src={message.image}
               alt="Attachment"
               className="sm:max-w-[200px] rounded-md mb-2"
             />
              )}
              {message.text&&(<p>{message.text}</p>)}
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  )
}

export default ChatContainer