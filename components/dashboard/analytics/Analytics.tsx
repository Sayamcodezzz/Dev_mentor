"use client";

import Loader from "@/components/pop/Loader";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


import { Code2, FileText, Calendar, Star, AlertTriangle, CheckCircle2, Target, ChartNoAxesCombined, Trash2 } from 'lucide-react';

const CodeCard = ({data, id, handleDelete}: {data: any, id: string, handleDelete: (e: string) => void}) => {
  const getRatingColor = (rating: number) => {
    if (rating >= 8) return 'text-emerald-400';
    if (rating >= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getRatingBg = (rating: number) => {
    if (rating >= 8) return 'bg-emerald-500/20';
    if (rating >= 6) return 'bg-yellow-500/20';
    return 'bg-red-500/20';
  };

  const formatDate = (dateString: number) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

    const router = useRouter()

  const handleRoute = () => {
    const encodedCode = btoa(data.snippets.code)
    const encodedData = btoa(JSON.stringify(data))

    localStorage.setItem("code", encodedCode)
    localStorage.setItem("all_data", encodedData)

    router.push(
      `/differ?language=${data.language}&id=${id}&edit=${true}`
    )
  }


  return (
    <div
    className="group relative w-full max-w-md mx-auto overflow-hidden py-4 pb-10">
            <Trash2 onClick={() => handleDelete(data.id)} className="hover:fill-current text-red-400 absolute z-50 top-[42%] right-4 hover:scale-110 transition-all group-hover:translate-x-0 translate-x-24" size={16}/>

      {/* Main Card */}
      <div 
      onClick={handleRoute}
      className="relative bg-neutral-800/90 backdrop-blur-sm border border-neutral-700/50 rounded-xl overflow-hidden transition-all duration-500 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-2">
        
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2306b6d4' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Glowing Border Effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Image Section */}
        <div className="relative h-40 overflow-hidden">
          <img 
            src={"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop&auto=format"} 
            alt="Code preview"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
          
          {/* Code Rating Badge */}
          <div className={`absolute top-3 right-3 px-3 py-1 rounded-full ${getRatingBg(data.code_rating)} backdrop-blur-sm border border-neutral-600/50 transition-all duration-300 group-hover:scale-110`}>
            <div className="flex items-center gap-1">
              <ChartNoAxesCombined className={`w-4 h-4 ${getRatingColor(data.code_rating)} fill-current`} />
              <span className={`text-sm font-mono font-bold ${getRatingColor(data.code_rating)}`}>
                {data.code_rating}/10
              </span>
            </div>
          </div>

          {/* Terminal-style overlay */}
          <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 space-y-4">
          {/* File Info */}
          <div className="space-y-2">
            {/* <div className="flex justify-between relative"> */}
            <div className="flex items-center gap-2 text-amber-400">
              <Code2 className="w-4 h-4" />
              <span className="font-mono text-sm font-medium truncate">{data.snippets.fileName}</span>
            </div>
            {/* </div> */}
            
            <div className="flex items-center gap-2 text-neutral-400">
              <Calendar className="w-3 h-3" />
              <span className="text-xs font-mono">{formatDate(data.createdAt)}</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Key Points */}
            <div className="bg-neutral-700/90 rounded-lg p-3 border border-neutral-700/30 transition-all duration-300 hover:border-emerald-500/50 hover:bg-emerald-500/5">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-neutral-400 font-medium">Key Improvements</span>
              </div>
              <div className="text-xl font-bold text-emerald-400 font-mono">{data.key_improvements.length}</div>
            </div>

            {/* Mistakes */}
            <div className="bg-neutral-700/90 rounded-lg p-3 border border-neutral-700/30 transition-all duration-300 hover:border-red-500/50 hover:bg-red-500/5">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-xs text-neutral-400 font-medium">Mistakes</span>
              </div>
              <div className="text-xl font-bold text-red-400 font-mono">{data.Mistakes.length}</div>
            </div>

            {/* Total Lines */}
            <div className="bg-neutral-700/90 rounded-lg p-3 border border-neutral-700/30 transition-all duration-300 hover:border-blue-500/50 hover:bg-blue-500/5">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-neutral-400 font-medium">Things To Learn</span>
              </div>
              <div className="text-xl font-bold text-blue-400 font-mono">{data.things_to_learn.length}</div>
            </div>

            {/* Complexity */}
            <div className="bg-neutral-700/90 rounded-lg p-3 border border-neutral-700/30 transition-all duration-300 hover:border-purple-500/50 hover:bg-purple-500/5">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-neutral-400 font-medium">Enhancement Suggestion</span>
              </div>
              <div className="text-xl font-bold text-purple-400 font-mono">{data.enhance_suggestion.length}</div>
            </div>
          </div>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-blue-500/5" />
        </div>
      </div>

      {/* Glowing Shadow Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/20 via-blue-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10" />
    </div>
  );
};


function Analytics() {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const { data: session, status } = useSession();
  const [delstatus, setDelStatus] = useState(false)
  const { user } = useAuth();

  const fetchData = async () => {
    setLoading(true);
    const res = await axios.get(`/api/analytics?id=${id}`);
    if (res.status === 200) {
      setData(res.data.data);
      setLoading(false);
    }
  };

    const handleDelete = async (id: string) => {
    setDelStatus(true)
    const del = await axios.delete(`/api/analytics?id=${id}`)
    if (del.status === 200) {
      fetchData() 
      setDelStatus(false)
    }
  }


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
      fetchData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {/* // <div className="flex flex-wrap justify-start items-center gap-6"> */}
      {data.length > 0 ? (
        data.map((item: any, index: number) => <CodeCard handleDelete={handleDelete} key={index} data={item} id={id} />)
      ) : (
        <div className="w-[69vw] h-[60vh] flex justify-center items-center">
          <p className="text-center text-xl">
            {" "}
            You've not created any snippets <br />
            <Link href={"/"} className="text-amber-500 underline">
              Create Now
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default Analytics;
