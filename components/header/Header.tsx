import React, { HTMLInputTypeAttribute } from "react";
import { monacoLanguages } from "../data/languages";
import Link from "next/link";
import { LucidePenLine } from "lucide-react";
import Image from "next/image";
import logo from "@/public/logo.png"
function Header({
  selectedLang,
  setSelectedLang,
  isEdit = false,
  apiCall,
  code,
  fileName,
  setFileName
}: {
  selectedLang: string;
  setSelectedLang: (e: HTMLInputTypeAttribute) => void;
  isEdit?: boolean;
  apiCall: { loading: boolean; func: () => void };
  code: string
  fileName: string,
  setFileName: (e: HTMLInputTypeAttribute) => void
}) {
  const len = code.trim()
  
  return (
    <div className="w-[95%] h-16 rounded-xl flex justify-between items-center px-6">

      <div className="w-32 h-[130%]">
        <Image alt="logo" src={logo.src} width={logo.width} height={logo.height} className="w-full h-full object-contain pt-3" />
        </div>
      <div className="w-auto relative">
      <input 
      className="bg-neutral-800 rounded-lg px-2 py-1 outline-none text-sm text-neutral-400"
      value={fileName}
      onChange={(e) => setFileName(e.target.value)}

      />
      <LucidePenLine size={12} className="absolute right-3 bg-neutral-800 top-1/4 text-neutral-500" />
      </div>
      <div className="flex items-center gap-4">
        {!isEdit && (
          <select
            className="mr-8 bg-transparent text-white"
            style={{ scrollbarWidth: "none" }}
            defaultValue={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
          >
            {monacoLanguages.map((item, index) => (
              <option
                style={{ scrollbarWidth: "none" }}
                className="bg-neutral-800"
                key={index}
                value={item}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </option>
            ))}
          </select>
        )}

        <button
          onClick={() => apiCall.func()}
          className={`w-6 h-6 cursor-pointer ${len.length > 0 ? "text-white" : "text-white/60"}`}
          disabled={len ? false : true}
        >
          {apiCall.loading ? (
            <p>...</p>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
              <rect width="256" height="256" fill="none" />
              <path
                d="M180,104h20a8,8,0,0,1,8,8v96a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V112a8,8,0,0,1,8-8H76"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              />
              <polyline
                points="88 64 128 24 168 64"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              />
              <line
                x1="128"
                y1="24"
                x2="128"
                y2="136"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              />
            </svg>
          )}
        </button>
        <Link href="/" className="w-6 h-6 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <rect width="256" height="256" fill="none" />
            <line
              x1="40"
              y1="128"
              x2="216"
              y2="128"
              fill="none"
              stroke="#ffffff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
            <line
              x1="128"
              y1="40"
              x2="128"
              y2="216"
              fill="none"
              stroke="#ffffff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
          </svg>
        </Link>

        <Link
          href="/dashboard"
          className="w-10 h-10 cursor-pointer bg-pink-950 rounded-full p-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <rect width="256" height="256" fill="none" />
            <circle
              cx="128"
              cy="96"
              r="64"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
            <path
              d="M32,216c19.37-33.47,54.55-56,96-56s76.63,22.53,96,56"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default Header;
