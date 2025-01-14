import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Mail, MessageSquare, User,LockKeyhole,Eye,EyeOff, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import AuthImagePattern from '../components/AuthImagePattern'
import{ toast }from 'react-hot-toast'

const SignUpPage = () => {
    const [showPassword,setShowPassword] = useState(false)
    const [formData,setFormData] = useState({
        fullName:"",
        email:"",
        password:"",
    })
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const { signup,isSigningIn } = useAuthStore()

    const validateForm = ()=>{
      if(!formData.fullName.trim())return toast.error(" Full name is required ")
      if(!formData.email.trim())return toast.error(" Email is required ")
      if(!formData.password.trim())return toast.error(" Password is required ")
      if(formData.password.length<6)return toast.error(" Password must be atleast 6 characters ")
      const emailCheck = emailRegex.test(formData.email)
      if(!emailCheck)return toast.error(" Please enter correct credentials ")

      return true
      
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        const success = validateForm()
        if(success===true){
          signup(formData)
        }
    }
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
    {/* left side */}
    <div className="flex flex-col justify-center items-center p-6 sm:p-12">
      <div className="w-full max-w-md space-y-8">
        {/* LOGO */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <div
              className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
            group-hover:bg-primary/20 transition-colors"
            >
              <MessageSquare className="size-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mt-2 tracking-tight">Create Account</h1>
            <p className="text-base-content/60 text-xl tracking-tight">Get started with your free account</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='form-control'>
                <label className='label'>
                  <span className='label-text font-medium'>Full Name</span>
                </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <User className='size-5 text-base-content/40'></User>
              </div>
              <input
              type='text'
              className='input input-bordered w-full pl-10'
              placeholder='John Doe'
              value={formData.fullName}
              onChange={(e)=>{setFormData({...formData,fullName:e.target.value})}}>
              </input>
            </div>
            </div>
        <div className='form-control'>
            <label className='label'>
                <span className='label-text font-medium'>Email</span>
            </label>
            <div className='relative'>
                <div className='absolute flex items-center inset-y-0 left-0 pl-3 pointer-events-none '>
                    <Mail className='size-5 text-base-content/40'></Mail>
                </div>
                <input 
                type='text'
                className='input input-bordered w-full pl-10'
                value={formData.email}
                onChange={(e)=>{setFormData({...formData,email:e.target.value})}}
                placeholder='you@example.com'>
                </input>

            </div>
        </div>
        <div className='form-control'>
            <label className='label'>
                <span className='label-text font-medium'>Password</span>
            </label>
            <div className='relative'>
                <div className='absolute flex items-center inset-y-0 left-0 pl-3 pointer-events-none '>
                <LockKeyhole className="text-base-content/40 size-5"></LockKeyhole>
                </div>
                <input 
                type={showPassword?"text":"password"}
                className='input input-bordered w-full pl-10'
                value={formData.password}
                onChange={(e)=>{setFormData({...formData,password:e.target.value})}}
                placeholder="••••••••">
                </input>
                <button type="button"className='absolute inset-y-0 right-0 pr-3 flex items-center' onClick={()=>setShowPassword(!showPassword)}>
                    {showPassword?<EyeOff></EyeOff>:<Eye></Eye>}
                </button>
            </div>
        </div>

        <div>
            <button type='submit' className="btn btn-primary w-full" disabled={isSigningIn} >{ isSigningIn? 
            <Loader2 className='animate-spin size-5'>Loading..</Loader2>:
           ("Create an Account")}</button>
        </div>

        <div className='text-center'>
        <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Login
              </Link>
            </p>
        </div>

        </form>
    </div>
    </div>
    {/* right side */}
    <div>
        <AuthImagePattern title={"Join our community"} subtitle={"Connect with friends, share moments, and stay in touch with your loved ones."}/>
    </div>

    </div>
  )
}

export default SignUpPage