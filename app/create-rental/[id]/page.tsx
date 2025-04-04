import React from 'react'
import RentalClient from './CreateRentalClient'

const page = async ({params}: {params: {id: number}}) => {
  const resolveParams = await params
  const {id} = resolveParams
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100">
        <RentalClient id={id} />
    </div>
  )
}

export default page