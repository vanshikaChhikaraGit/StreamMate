import { MessageSquare } from 'lucide-react'
import React from 'react'

const NoChatSelected = () => {
  return (
    <div className='w-full flex flex-col flex-1 items-center justify-center mx-auto bg-base-100/50'>
       <div className='max-w-md text-center space-y-6'>
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce"
            >
              <MessageSquare className="w-8 h-8 text-primary " />
            </div>
          </div>
        </div>
        <h1 className="text-2xl font-bold"> Welcome to StreamMate</h1>
        <p className="text-base-content/60">Select a conversation to start chatting with your friends!</p>
       </div>
    </div>
  )
}

export default NoChatSelected