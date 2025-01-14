import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import { X } from 'lucide-react'

const ChatHeader = () => {
    const { selectedUser,setSelectedUser } = useChatStore()
    const { onlineUsers } = useAuthStore()
  return (
    <div className='border-b border-base-300 p-2.5'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
                {/* avatar */}
                <div className='rounded-full size-10'>
                    <img src={selectedUser.profilePic||"/avatar.png"}></img>
                </div>
                {/* user info */}
                <div>
                    <h1 className='font-medium'>{selectedUser.fullName}</h1>
                    <p className='text-sm text-base-content/70'>
                        {onlineUsers.includes(selectedUser._id)?"Online":"Offline"}
                    </p>

                </div>
            </div>
            <button onClick={()=>setSelectedUser(null)}>
            <X />
            </button>
        </div>
    </div>
  )
}

export default ChatHeader