import React from 'react'
import { FcGoogle } from 'react-icons/fc'

export const Google = () => {
  return (
    <div className='flex '>
        <button className='h-12 w-36 group flex space-x-2 border rounded p-2 font-semibold text-sm bg-white justify-center align-middle hover:bg-slate-200'>
            <span className='justify-center align-middle'><FcGoogle className='h-7 w-6 self-center align-middle text-slate-600 group-hover:text-white'/></span>
            <span className='hidden justify-center align-middle self-center group-hover:text-white'>Sign in with Google</span>
        </button>
    </div>
  )
}
