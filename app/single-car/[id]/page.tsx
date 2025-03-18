import React from 'react'
import SingleCarClient from './SingleCarClient'
const page = async ({params}) => {
  const  resolveParams = await params;
  const {id} = resolveParams

  return (
    <div>
      <SingleCarClient id={id} />
    </div>
  )
}

export default page