import DifferEditorFunc from '@/components/funcs/DifferEditor'
import Loader from '@/components/pop/Loader'
// import { DiffEditor } from '@monaco-editor/react'
import React, { Suspense } from 'react'

function page() {
  return (
    <Suspense fallback={<Loader />}>
      <DifferEditorFunc />
    </Suspense>
  )
}

export default page