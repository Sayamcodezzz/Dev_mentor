"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react'


function page() {
    const router = useRouter()
    useEffect(() => {
        router.replace("/auth/login")
    },[])
  return null
}

export default page