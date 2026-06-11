import Link from 'next/link'
import React from 'react'
import Loader from '../pop/Loader'
import { signIn } from 'next-auth/react'
import logo from "@/public/logo.png"

type elementType = "LOGIN" | "SIGNUP" | "OTP"

export function Header({element}: {element: elementType}) {
    return (
        <>
        <div className="w-32 h-32 mb-2">
            <img 
                alt="logo"
                className="w-full h-full object-cover"
                src={logo.src}
            />
        </div>
        <h1 className="text-3xl font-semibold">{element === "LOGIN" ? "Welcome Back!" : "Hey, Welcome"}</h1>
        <p className="text-lg mb-5 text-neutral-200 font-normal mt-1">
            {
                element === "LOGIN" ?
                "Let's get back to your gang!" : "Let's get better together!"
            }
        </p>
        </>
    )
}

export function Button({element, onClick, stateManage}: {element: elementType, onClick: () => void, stateManage: boolean}) {
    return (
                <div className="w-full flex justify-center items-center">
          <button disabled={stateManage} onClick={stateManage ? () => {} : onClick} className="w-full py-2.5 border-2 cursor-pointer border-amber-600 rounded-lg text-xl font-medium outline-none mb-4 mt-2 hover:bg-amber-600 transition-all duration-300 flex justify-center items-center">
           {
              stateManage ? <Loader /> : element === "LOGIN" ? "Login" : element === "OTP" ? "Verify OTP" : "Create Account"
        } 
          </button>
        </div>

    )
}


export function SocialMediaAuth() {
    return (
                <div className="w-full flex justify-center items-center gap-4 my-4">
          <button onClick={() =>
          signIn('google', {
            callbackUrl: '/', // or your protected page
          })} className="w-14 h-14 rounded-full border-2 border-neutral-700 hover:text-neutral-700 hover:bg-white hover:border-0 cursor-pointer text-neutral-200 grid place-items-center">
            <div className="w-8 h-8">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                <rect width="256" height="256" fill="none" />
                <path
                  d="M128,128h88a88,88,0,1,1-20.11-56"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="24"
                />
              </svg>
            </div>
          </button>
          <button 
          onClick={() =>
          signIn('github', {
            callbackUrl: '/', // or your protected page
          })}
          className="w-14 h-14 rounded-full border-2 border-neutral-700 hover:text-neutral-700 hover:bg-white hover:border-0 cursor-pointer text-neutral-200 grid place-items-center">
            <div className="w-8 h-8">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                <rect width="256" height="256" fill="none" />
                <path
                  d="M119.83,56A52,52,0,0,0,76,32a51.92,51.92,0,0,0-3.49,44.7A49.28,49.28,0,0,0,64,104v8a48,48,0,0,0,48,48h48a48,48,0,0,0,48-48v-8a49.28,49.28,0,0,0-8.51-27.3A51.92,51.92,0,0,0,196,32a52,52,0,0,0-43.83,24Z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                />
                <path
                  d="M104,232V192a32,32,0,0,1,32-32h0a32,32,0,0,1,32,32v40"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                />
                <path
                  d="M104,208H72a32,32,0,0,1-32-32A32,32,0,0,0,8,144"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                />
              </svg>
            </div>
          </button>
        </div>
    )
}

function AuthMain({children, element, state=0, action, buttonState, error}: {
    children: React.ReactNode
    element: elementType
    state?: number
    action?: () => void
    buttonState?: boolean
    error?: string
}) {
  return (
        <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-[30%] h-auto bg-neutral-800 rounded-2xl flex flex-col p-8 pb-4">
        <Header element={element} />
            {children}
        
        <p className='text-red-500 w-full text-sm text-center py-1.5'>{error}</p>
        <Button element={element} onClick={action as () => void} stateManage={buttonState as boolean} />

        <hr className="text-neutral-600" />
      {
        (element === "SIGNUP" || element === "LOGIN") && state === 0 &&
        <SocialMediaAuth />
      }

        <p className="text-center text-neutral-500 text-sm py-2">
          {
            element === "LOGIN" ? (
              <>
              New Here?{" "}
          <Link href={"/auth/signup"} className="underline cursor-pointer">Create Account</Link>
              </>
            ) : (
            <>
              Have A Account?{" "}
          <Link href={"/auth/login"} className="underline cursor-pointer">Login Now</Link>
              </>
            )
          }
        </p>
      </div>
    </div>
  )
}

export default AuthMain
