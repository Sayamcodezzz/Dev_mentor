"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import image from "@/public/minimap.png";
import image2 from "@/public/vsCodeLogo.png";
import axios from "axios";
import getToken from "@/context/getToken";
import { useSession } from "next-auth/react";
import { useAuth } from "@/context/AuthContext";
import Loader from "@/components/pop/Loader";
import Link from "next/link";


import { Code, Calendar, Database, Play, Trash, Trash2 } from 'lucide-react';
import { useRouter } from "next/navigation";

const SnippetCard = ({fileName, createdAt, id, codeLang, code, analytics}: {
  fileName: string
  createdAt: string
  id: string
  codeLang: string
  code: string,
  analytics: any
}) => {
  const hasAnalytics = analytics.length > 0;
  
  const router = useRouter()
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };


  const getLanguageColor = (lang: string) => {
    const langLower = lang.toLowerCase();
    if (langLower.includes('javascript') || langLower.includes('js')) return 'text-yellow-400';
    if (langLower.includes('python') || langLower.includes('py')) return 'text-green-400';
    if (langLower.includes('typescript') || langLower.includes('ts')) return 'text-blue-400';
    if (langLower.includes('react') || langLower.includes('jsx')) return 'text-cyan-400';
    if (langLower.includes('css')) return 'text-pink-400';
    if (langLower.includes('html')) return 'text-orange-400';
    if (langLower.includes('java')) return 'text-red-400';
    if (langLower.includes('php')) return 'text-purple-400';
    return 'text-amber-400';
  };

  const handleRoute = () => {
    router.push(`/${id}`)
  }

  const handleDelete = async () => {
    const res = await axios.delete(`/api/data?id=${id}`)
    if (res.status === 200) {
      window.location.reload()
    }
  }

  
  return (
    <div className="group relative w-full max-w-md mx-auto">
      {/* Main Card */}
      <div onClick={handleRoute} className="relative cursor-pointer max-h-72 bg-neutral-900/90 backdrop-blur-sm border overflow-hidden border-neutral-700/50 rounded-xl overflow-hidden transition-all duration-500 hover:border-amber-500/60 hover:shadow-2xl hover:shadow-amber-500/20 hover:-translate-y-1">
        
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f59e0b' fill-opacity='0.1'%3E%3Cpath d='M20 20.5V18H18v2.5h-2.5V22H18v2.5h2V22h2.5v-1.5H20zM0 38.59l2.59-2.59 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.59 2.59L1.41 5.59 0 4.18V1.41z'/%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Glowing Border Effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Header Section */}
        <div className="relative p-5 border-b border-neutral-700/30">
          {/* Terminal Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="flex gap-1 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <span className="text-xs text-neutral-500 font-mono ml-2">~/snippets</span>
            </div>
          </div>

          {/* File Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-amber-400" />
              <span className="font-mono text-white font-medium truncate text-sm">{fileName}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-neutral-400">
                <Calendar className="w-3 h-3" />
                <span className="text-xs font-mono">{formatDate(createdAt)}</span>
              </div>
              
              <div className="flex items-center gap-1 text-xs">
                {/* <span className="text-lg">{getLanguageIcon(codeLang)}</span> */}
                <span className={`font-mono font-medium ${getLanguageColor(codeLang)}`}>
                  {codeLang}
                </span>
              </div>
            </div>
          </div>
        <p className={`text-xs ${hasAnalytics ? "text-green-600" : "text-red-400"} text-right mt-2 -mb-2`}>Analyzed - {hasAnalytics ? "You" : "No"}</p>
        </div>


        {/* Code Preview Section */}
        <div className="relative p-4 bg-neutral-950/50">
          <div className="flex items-center gap-2 mb-2">
            <Play className="w-3 h-3 text-amber-400" />
            <span className="text-xs text-neutral-400 font-mono">Code Preview</span>
          </div>
          
          <div className="bg-neutral-900/80 rounded-lg p-3 h-24 border border-neutral-700/30 font-mono text-xs overflow-hidden">
            <pre className="text-neutral-300 whitespace-pre-wrap leading-relaxed">
              {code.slice(0, 100)} <br /> <span className="text-amber-500">...open to view</span>
            </pre>
          </div>
        </div>

        {/* <div className="p-5 space-y-4">
          <div className="flex justify-center">
            <div className={`rounded-lg p-4 border transition-all duration-300 w-full text-center ${
              hasAnalytics 
                ? 'bg-amber-500/10 border-amber-500/30 hover:border-amber-400/50 hover:bg-amber-500/15' 
                : 'bg-neutral-800/50 border-neutral-700/30 hover:border-neutral-600/50'
            }`}>
              <h1>View</h1>
            </div>
          </div>
        </div> */}

        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5" />
        </div>

        {/* Floating Code Icon */}
        <div className="absolute top-2 left-1/3 opacity-0 group-hover:opacity-20 transition-all duration-500 transform group-hover:rotate-12">
          <Database className="w-6 h-6 text-amber-400" />
        </div>
      </div>
      <Trash2 onClick={handleDelete} className="w-4 h-4 text-red-500  duration-500 -translate-y-96 group-hover:-translate-y-64 transition-transform hover:fill-current cursor-pointer group-hover:scale-110 absolute right-6 z-50" />


      {/* Glowing Shadow Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-yellow-500/20 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10" />
    </div>
  );
};


function Snippets() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const { data: session, status } = useSession();

  const { user } = useAuth();

  const fetchData = async () => {  
    setLoading(true)
    const res = await axios.get(`/api/userBin?id=${id}`);
    if (res.status === 200) {
        setData(res.data.data[0].snippets)
        setLoading(false)
    }
};

  useEffect(() => {
    if (status === "authenticated") {
        const userWithId = session.user as typeof session.user & { id?: string };
        setId(userWithId.id as string);
    } else {
      if (user?.id) {
        setId(user.id);
      }
    }
  }, [user?.id, status]);

  useEffect(() => {
    if (id) {
        fetchData()
    }
  }, [id])

  if (loading) {
    return (
        <div className="w-full h-full flex justify-center items-center">
    <Loader />
        </div>
    )
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {
            data.length > 0 ? data.map((item: {createdAt: string, analytics: any, code: string, codeLang: string,  fileName: string, id: string}, index) => (
                <SnippetCard id={item.id} analytics={item.analytics} code={item.code} codeLang={item.codeLang} key={index} createdAt={item.createdAt} fileName={item.fileName} />
            )) : <div className="w-[69vw] h-[60vh] flex justify-center items-center"><p className="text-center text-xl"> You've not created any snippets <br /><Link href={"/"} className="text-amber-500 underline">Create Now</Link></p></div>
        }
    </div>
  );
}

export default Snippets;
