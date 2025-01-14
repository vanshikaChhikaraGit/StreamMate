import React from 'react'

const AuthImagePattern = ({ title,subtitle }) => {
  return (
    
    <div className='hidden lg:flex items-center justify-center bg-base-200 p-12'>
        
        <div className='max-w-md tracking-tight text-center'>
          <div className='grid grid-cols-3 gap-3 mb-8'>
           {[...Array(9)].map((_,i)=>(
            <div key={i} className={`aspect-square rounded-2xl bg-primary/10 ${i%2===0?"animate-pulse":""}`}>
            </div>
           ))}
          </div>
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-base-content/60 mb-4 text-xl font-medium">{subtitle}</p>
        </div>
    </div>
  )
}

export default AuthImagePattern