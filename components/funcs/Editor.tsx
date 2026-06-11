"use client"

import  Editor  from '@monaco-editor/react'
import React from 'react'

function CodeEditor({codeLang, setCode, code}: {code: string, codeLang: string, setCode: (e: string) => void}) {
  return (
      <div className="w-full h-[88%] bg-[#141414] rounded-2xl">
        <Editor 
        height={"100%"}
        language={codeLang}
        defaultLanguage={codeLang}
        defaultValue='// ...Paste your code'
        theme='vs-dark'
        value={code}
        onChange={(e: any) => setCode(e)}
        options={{
          minimap: {enabled: false}
        }}
        />

      </div>
  )
}

export default CodeEditor