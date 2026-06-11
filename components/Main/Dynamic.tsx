'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'next/navigation'
import Home from './Home'

export default function Dynamic() {
  const { id } = useParams<{ id: string }>()
  const [data, setData] = useState<{code: string, codeLang: string, fileName: string}>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!id) return

    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/data?id=${id}`)
        setData(res.data.data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) return <div className='text-center'>Loading...</div>
  if (error) return <div className="text-red-500">Error: {error}</div>

  return (
    <Home
    Inpcode={data?.code}
    id={id}
    isEdit={true}
    language={data?.codeLang}
    fileSet={data?.fileName}
    />
  )
}
