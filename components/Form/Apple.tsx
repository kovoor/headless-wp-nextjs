import React from 'react'
import { AiFillApple } from 'react-icons/ai'
export const Apple = () => {
  return (
    <div className='flex flex-1 '>
        <button className='h-12 w-36 group flex space-x-2 border rounded p-2 font-semibold text-sm bg-white justify-center align-middle hover:bg-black'>
            <span className='justify-center align-middle'><AiFillApple className='h-7 w-6 self-center text-slate-600 group-hover:text-white'/></span>
            <span className='hidden justify-center align-middle self-center group-hover:text-white'>Sign in with Apple</span>
        </button>
    </div>
  )
}
