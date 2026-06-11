'use client'

import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useAuth } from "./AuthContext"

export default function TokenManager() {
  const { data: session } = useSession()
  useEffect(() => {
    if (session) {
        const token = JSON.stringify(session.accessToken)
      document.cookie = `token=${token}; path=/; max-age=604800`; // 7 days
      localStorage.setItem("token", JSON.stringify({
            value: token,
            createdAt: Date.now(),
          }))
    }
  }, [session])

  return null
}
