import React from 'react'

function Footer() {
    const date = new Date();
    const year = date.getFullYear();
  return (
      <div className="fixed bottom-0 w-full h-5 bg-neutral-900 flex px-12 pl-6 justify-between items-center">
        <div className="flex justify-start items-center gap-2 text-neutral-500 py-1">
          <div className="w-4 h-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
              <rect width="256" height="256" fill="none" />
              <circle
                cx="128"
                cy="128"
                r="96"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
              <path
                d="M160,152a40,40,0,1,1,0-48"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
            </svg>
          </div>
          <p className="text-xs"> Arinova Studio - {year}</p>
        </div>
        <p className="text-xs cursor-pointer text-neutral-500">Build with Love</p>
        <div className="flex justify-center items-center gap-2 text-neutral-500">
          <div className="w-4 h-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
              <rect width="256" height="256" fill="none" />
              <path
                d="M80,40c-64,0,0,88-64,88,64,0,0,88,64,88"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
              <path
                d="M176,40c64,0,0,88,64,88-64,0,0,88-64,88"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
            </svg>
          </div>
          <p className="text-xs underline cursor-pointer">Adarsh Pandit</p>
        </div>
      </div>
  )
}

export default Footer
