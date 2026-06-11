"use client";

import DataAuditInsights from "@/components/funcs/DataInslight";
import Loader from "@/components/pop/Loader";
import { DiffEditor } from "@monaco-editor/react";
import axios from "axios";
import { CheckCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

interface DataType {
  key_improvements?: string[];
  Mistakes?: any[];
  things_to_learn?: string[];
  code_rating?: number;
  enhance_suggestion?: string[];
  enhanced_code?: string;

}


function DifferEditorFunc() {
  const params = useSearchParams();
  const languages = params.get("language");
  const isSaved = params.get("saved");
  const Edit = params.get("edit");
  const id = params.get("id");

  const [isEdit, setEdit] = useState<boolean>(Boolean(Edit) || false);
  const [saved, setSaved] = useState<boolean>(Boolean(isSaved));
  const [minimize, setMinimize] = useState(false)

  const [oldCode, setOldCode] = useState("");
  const [data, setdata] = useState<DataType | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();





  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/analytics", {
        userId: id,
        oldCode: oldCode,
        key_improvements: data?.key_improvements,
        Mistakes: data?.Mistakes,
        things_to_learn: data?.things_to_learn,
        code_rating: data?.code_rating,
        enhance_suggestion: data?.enhance_suggestion,
        enhance_code: data?.enhanced_code,
      });
      if (res.status === 200) {
        setSaved(true);
        alert("Saved...");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
useEffect(() => {
  const hashedOldCode = localStorage.getItem("code");
  const hashedData = localStorage.getItem("all_data");

  if (!hashedOldCode || !hashedData) {
    console.warn("Missing code or all_data in localStorage");
    return;
  }

  try {
    const OldCode = atob(hashedOldCode);
    const dataF = atob(hashedData);
    const parseData = JSON.parse(dataF);

    setOldCode(OldCode);
    setdata({
      code_rating: parseData.code_rating,
      enhance_suggestion: parseData.enhance_suggestion,
      enhanced_code: parseData.enhance_code,
      key_improvements: parseData.key_improvements,
      Mistakes: parseData.Mistakes,
      things_to_learn: parseData.things_to_learn,
    });


    localStorage.removeItem("code");
    localStorage.removeItem("all_data");

  } catch (err) {
    console.error("Failed to decode or parse localStorage data:", err);
  }
}, []);

  useEffect(() => {
    if (!languages && !id) {
      router.back();
    }
  }, []);

  
  return (
    // <Suspense fallback={<Loader />}>
    <div className="w-full h-screen bg-[#141414] rounded-2xl relative">
      <DiffEditor
        original={oldCode}
        modified={data?.enhanced_code}
        height="100%"
        language={languages as string}
        theme="vs-dark"
        options={{
          tabIndex: 1,
          renderSideBySide: true,
          diffWordWrap: "on",
          readOnly: true,
        }}
      />

      <div className={`opacity-100 backdrop-blur-lg smped absolute bottom-4 right-8 w-1/3 min-h-12 ${minimize ? "max-h-0" : "max-h-[95vh]"} hover:bg-[#2a2a2a] transition-all bg-[#2a2a2a40] z-50 flex flex-col justify-between items-start gap-2.5 p-4`}>
        <div className={`${minimize ? "overflow-hidden" : "overflow-auto"} smped`}>
          <p className="text-xs text-neutral-400 uppercase w-full flex justify-between">Dev Mentor Ai <span className={`cursor-pointer`} onClick={() => setMinimize(!minimize)}>{minimize ? "+ Maximize" : "- minimize"}</span></p>
          {isEdit || saved ? (
            <div className="py-4 px-4">
              <DataAuditInsights data={data as DataType} />
            </div>
          ) : (
            <>
              <p className="text-xs text-amber-400 font-sans my-2 mt-1">
                Caution - Going back from here will lost your Analysis Data
              </p>
              <p className="my-2 mt-1 text-xl">
                Do You Want To Save This Analysis?
              </p>
              <div className="w-full flex gap-2 justify-end items-end">
                <button
                  onClick={() => router.back()}
                  className="px-4 py-2 cursor-pointer hover:bg-neutral-800"
                >
                  Back
                </button>
                <button
                  onClick={saved ? () => {} : handleSave}
                  className={`
              ${
                loading || saved
                  ? "opacity-60 cursor-not-allowed"
                  : "opacity-100 cursor-pointer"
              }
                bg-orange-600 hover:bg-orange-700
                px-4 py-2 flex items-center justify-center gap-2`}
                >
                  {saved ? "Saved" : loading ? "Saving..." : "Save"}
                  {saved && <CheckCheck size={16} />}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
    // </Suspense>

  );
}

export default DifferEditorFunc;
