import { Dot } from 'lucide-react'
import React from 'react'

export const Card = ({ icon, label, mb, item}) => {
  return (
    <div className='border border-cl rounded-lg p-4 shadow'>
      <div className='flex flex-col gap-2'>
        <div className='text-2xl'>
          <span className='text-blue-800'>{icon}</span>
        </div>
        <div>
          <h1 className='font-semibold'>{label}</h1>
        </div>
        <div className='flex items-center text-[14px]'>
          <span>{mb} GB</span> <span><Dot size={25} /></span>
          <span>{item} items</span>
        </div>
      </div>
    </div>
  )
}
