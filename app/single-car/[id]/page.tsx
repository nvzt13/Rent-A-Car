import React from 'react'
import SingleCarClient from './SingleCarClient'


interface Params {
  id: string;
}

const page = async ({ params }: { params: Promise<Params> }) => {
  const  resolveParams = await params;
  const {id} = resolveParams

  return (
    <div>
      <SingleCarClient id={id} />
    </div>
  )
}

export default page