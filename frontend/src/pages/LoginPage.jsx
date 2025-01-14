import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Mail, MessageSquare, User,LockKeyhole,Eye,EyeOff, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import AuthImagePattern from '../components/AuthImagePattern'
import{ toast }from 'react-hot-toast'

const LoginPage = () => {
  const [showPassword,setShowPassword] = useState(false)
  const [formData,setFormData] = useState({
    email:"",
    password:""
  })
  const { isLoggingIn,login } = useAuthStore()

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validateForm = ()=>{
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
      login(formData)
     }
  }
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
       {/* left side */}
       <div className="flex items-center justify-center flex-col p-6 sm:p-12">
       <div className="w-full max-w-md space-y-8">
        {/* logo */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <div
              className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
            group-hover:bg-primary/20 transition-colors"
            >
              <MessageSquare className="size-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mt-2 tracking-tight">Welcome Back</h1>
            <p className="text-base-content/60 text-xl tracking-tight">Sign In to your account</p>
          </div>
        </div>
        {/* form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
           <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="text-base-content/40 size-5"></Mail>
              </div>
              <input 
              type="text"
              value={formData.email}
              className="input input-bordered w-full pl-10"
              placeholder="you@example.com"
              onChange={(e)=>{setFormData({...formData,email:e.target.value})}}
              ></input>
            </div>
           </div>
           <div className="form-control">
            <label className="label-text font-medium"> Password </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <LockKeyhole className="text-base-content/40 size-5"></LockKeyhole>
              </div>
              <input 
              className="w-full pl-10 input input-bordered"
              type={showPassword?"text":"password"}
              onChange={(e)=>{setFormData({...formData,password:e.target.value})}}
              placeholder="••••••••"
              ></input>
              <button type="button" className=" absolute inset-y-0 right-0 pr-3 flex items-center" onClick={()=>setShowPassword(!showPassword)}>
                {showPassword?<EyeOff></EyeOff>:<Eye></Eye>}
              </button>
            </div>
             
           </div>
       
        <div>
          <button className="btn btn-primary w-full text-center" type="submit" disabled={isLoggingIn}>
            {isLoggingIn?<Loader2 className='animate-spin size-5'>Loading...</Loader2>:("Login")}
          </button>
        </div>
         <div className='text-center'>
              <p className="text-base-content/60"> Don't have an account?{" "}
              <Link to="/signup" className="link link-primary"> SignUp </Link></p>
         </div>
       </form>
       </div>
       </div>
       
       {/* rightside */}
       <div>
       <AuthImagePattern title={"Welcome Back!"} subtitle={"Sign In to continue your conversations and catch up with your friends and loved ones!"}></AuthImagePattern>
       </div>
      
    </div>
  )
}

export default LoginPage