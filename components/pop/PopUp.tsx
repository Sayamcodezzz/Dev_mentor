import React from 'react'
import cono from "@/public/congo.svg";

const url = process.env.NEXT_PUBLIC_BASE_URL;
function PopUp({link, setModel, Copy, copied}: {link: string, setModel: (val: boolean) => void, Copy: () => void, copied: boolean}) {
  return (
            <div className="absolute w-screen h-screen bg-black/20 z-50 backdrop-blur-xs flex justify-center items-center">
          <div className="w-1/3 h-1/4 bg-neutral-700 rounded-2xl flex justify-center items-start flex-col p-4 gap-2.5">
            <div className="flex gap-2 items-center">
              <h1 className="text-2xl font-medium">Congrulations</h1>
              <img src={cono.src} className="w-8 h-8" />
            </div>
            <div className="w-full h-12 rounded-lg bg-neutral-800 relative flex justify-between items-center px-2">
              <p className="text-gray-400 text-xs">
                {url}/{link}
              </p>
            </div>

            <h1 className="text-xs font-normal text-left w-full text-gray-200">
              This link will expire in 24h
            </h1>

            <div className="w-full flex gap-2 justify-end mt-2">
              <button
                className="px-4 py-2 rounded-lg cursor-pointer hover:bg-neutral-800"
                onClick={() => setModel(false)}
              >
                Close
              </button>
              <button
                onClick={Copy}
                className={`${
                  copied
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-amber-600 hover:bg-amber-700"
                } cursor-pointer px-4 py-2 rounded-lg`}
              >
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>
        </div>
  )
}

export default PopUp