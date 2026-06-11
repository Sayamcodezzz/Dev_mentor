import Image from 'next/image'
import React from 'react'
import logo from "@/public/logo.png"

function page() {
  return (
    <div className='overflow-hidden flex justify-center items-center flex-col w-screen h-screen'>
              <div className="w-2/4 h-1/4">
      <Image
      src={logo.src}
      className="w-full h-full object-cover pt-4 scale-150 mb-8"
      width={logo.width}
      height={logo.height}
      alt="LOGO"
      />
      </div>
        <h1 className='text-red-400 text-4xl py-4 font-bold'>Sorry!</h1>
        <p className='text-center text-lg px-1'>This Tool is not available for mobiles, Please access via desktop!</p>
    </div>
  )
}

export default page