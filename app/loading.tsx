import { FaSpinner } from 'react-icons/fa'
import React from 'react'

const Loading = () => {
  return (
    <div className='flex items-center justify-center w-full h-screen'>
      <FaSpinner className='animate-spin text-4xl' />
    </div>
  )
}

export default Loading
