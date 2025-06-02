import React from 'react'
import SingleCarClient from './SingleCarClient'


interface Params {
  id: string;
}

const page = async ({ params }: { params: Promise<Params> }) => {
  const  resolveParams = await params;
  const {id} = resolveParams

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <SingleCarClient id={id} />
    </div>
  )
}

export default page