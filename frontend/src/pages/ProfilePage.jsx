import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Camera, Mail, User } from 'lucide-react'

const ProfilePage = () => {
  const { authUser,isUpdatingProfile,updateProfile } = useAuthStore()
  const [selectedImg, setSelectedImg] = useState(null)

  const handleImageUpload = async(e)=>{
        const file = e.target.files[0]
        if(!file)return
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = async()=>{
          const base64Image = reader.result
          setSelectedImg(base64Image)
          await updateProfile({ profilePic: base64Image })
        }
  }
  
  return (
    <div className=' pt-20'>
      <div className='mx-auto max-w-2xl p-4 py-8'>
        <div className='bg-base-300'>
        <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* avatar section */}
          <div className='flex flex-col items-center gap-4 my-2'>
          <div className='relative'>
            <img src={selectedImg || authUser.profilePic || "/avatar.png"} alt='profile pic' className='rounded-full size-32 object-cover border-4'></img>
         <label htmlFor='avatar-upload' className={`absolute bottom-0 right-0 rounded-full bg-base-content p-2 hover:scale-105 cursor-pointer transition-all duration-200 ${isUpdatingProfile? "animate-pulse pointer-events-none":""}`}>
          <Camera className='size-5 text-base-200'></Camera>
          <input id='avatar-upload' type='file' accept='image/*' className='hidden' onChange={handleImageUpload} disabled={isUpdatingProfile}></input>
         </label>
          </div>
          <p className='text-sm text-zinc-400'>{isUpdatingProfile?("Uploading..."):("Click the camera icon to update your profile")}</p>
          </div>
          {/* personal info section */}
          <div className='m-4'>
             <div>
              <div className='flex flex-row m-2 items-center mt-4'><User className='text-base-content/40 size-5 mr-2'></User> <span className='font-semibold text-base-content/60 '>Full Name</span></div>
              <div className='border-2 border-base-content p-2 rounded-md w-full'>{authUser.fullName}</div>
             </div>
             <div>
             <div className='flex flex-row m-2 items-center mt-4'><Mail className='text-base-content/40 size-5 mr-2'></Mail> <span className='font-semibold text-base-content/60 '>Email Address</span></div>
             <div className='border-2 border-base-content p-2 rounded-md w-full'>{authUser.email}</div>
             </div>
          </div>
          {/* account info */}
          <div className="mt-2 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ProfilePage