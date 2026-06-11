import Dynamic from '@/components/Main/Dynamic';
import Loader from '@/components/pop/Loader';
import { fetchData } from '@/lib/apiCalls';
import React, { Suspense } from 'react'

export default async function page({ params }: {params: {id: string}}) {
  return (
    <Suspense fallback={<Loader />}>
  <Dynamic />
  </Suspense>
  )
}