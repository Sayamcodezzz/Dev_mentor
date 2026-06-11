"use client"

import Dashboard from '@/components/dashboard/Dashboard'
import { useAuth } from '@/context/AuthContext'
import { SideBarProvider } from '@/context/DashboardContext'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function page() {
  const router = useRouter()
  useEffect(() => {router.replace("/dashboard/snippets")} 
  , [])
}

export default page