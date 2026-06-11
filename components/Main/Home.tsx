"use client";

import CodeEditor from "@/components/funcs/Editor";
import Header from "@/components/header/Header";
import { useEffect, useState } from "react";
import { fetchData } from "@/lib/apiCalls";
import Footer from "../footer/Footer";
import PopUp from "../pop/PopUp";
import SidePrompt from "../pop/SidePrompt";
import { useSession } from "next-auth/react";
import { useAuth } from "@/context/AuthContext";


const url = process.env.NEXT_PUBLIC_BASE_URL;

export default function Home({
  Inpcode,
  language,
  isEdit = false,
  id,
  fileSet
}: {
  Inpcode?: string;
  language?: string;
  isEdit?: boolean;
  id?: string;
  fileSet?: string
}) {
  const [selectedLang, setSelectedLang] = useState<string[] | string>(
    language || "typescript"
  );
  const [code, setCode] = useState(Inpcode || "");
  const [model, setModel] = useState(false);
  const [link, setLink] = useState("");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [Userid, setId] = useState<string | undefined>(undefined)

    const { data: session, status } = useSession();
    const { user } = useAuth();

  const [fileName, setFileName] = useState(fileSet || "United");

  async function handleCall() {
    if (code.length < 0) {
      return;
    }
    setLoading(true);
    const { data } = await fetchData("POST", Userid, {
      code: code,
      codeLang: selectedLang as string,
      fileName: fileName

    });
    if (data) {
      setLink(data.id);
      setModel(true);
      setLoading(false);
      setSaved(true)
    }
  }

  async function handlePUT() {
    setLoading(true);
    const { data } = await fetchData("PUT", undefined, { code: code, id: id, fileName: fileName });
    if (data) {
      setLink(data.id);
      setModel(true);
      setLoading(false);
    }
  }

  async function Copy() {
    await navigator.clipboard.writeText(`${url}/${link}`);
    setCopied(true);
  }


    useEffect(() => {
      if (status === "authenticated") {
        const userWithId = session.user as typeof session.user & { id?: string };
        setId(userWithId.id);
      }
      else {
        if (user) {
          setId(user.id || undefined)
        }   
      }
      
    }, [user, status]);
  

  return (
    <div className="w-auto h-screen flex flex-col justify-start items-center gap-4 relative">
      {saved && <SidePrompt binId={link} code={code} language={selectedLang as string} close={setSaved} id={Userid as string} />}
      <Header
        apiCall={{
          loading: loading,
          func: isEdit === true ? handlePUT : handleCall,
        }}
        code={code}
        isEdit={isEdit}
        selectedLang={selectedLang as string}
        setSelectedLang={setSelectedLang}
        fileName={fileName}
        setFileName={setFileName}
      />
      <CodeEditor
        code={code}
        codeLang={selectedLang as string}
        setCode={setCode}
      />

      {model && (
        <PopUp 
        Copy={Copy}
        copied={copied}
        link={link}
        setModel={setModel}
        />
      )}
      <Footer />

    </div>
  );
}
