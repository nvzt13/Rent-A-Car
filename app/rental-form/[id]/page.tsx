import React from 'react'
import RentalClient from './RentalClient'

const page = async ({params}: {params: {id: number}}) => {
  const resolveParams = await params
  const {id} = resolveParams
  return (
    <div>
        <RentalClient id={id} />
    </div>
  )
}

export default page