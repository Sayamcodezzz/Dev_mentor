"use client";

import getToken from "@/context/getToken";
import analysisCode from "@/lib/ai";
import { CheckCheck, LucideLock } from "lucide-react";
import React, { useEffect, useState } from "react";
import DataAuditInsights from "../funcs/DataInslight";
import axios from "axios";
import { useRouter } from "next/navigation";

function SidePrompt({
  code,
  language,
  close,
  id,
  binId,
}: {
  id: string;
  code: string;
  language: string;
  binId: string,
  close: (e: boolean) => void;
}) {
  const [enabled, setEnabled] = useState(false);
  const [stage, setStage] = useState(0);
  const value = getToken();
  const [saved, setSaved] = useState(false)
  const [StateText, setStateText] = useState(
    "Do You Want To Analysis The Code?"
  );
  const [data, setData] = useState({
    key_improvements: [],
    Mistakes: [],
    things_to_learn: [],
    code_rating: 0,
    enhance_suggestion: [],
    enhance_code: "",
  });

  const router = useRouter()

  const handleClick = async () => {
    if (enabled) {
      setStateText("Analyzing.....");
      setEnabled(false);
      const response = await analysisCode(code);
      if (response) {
        setData({
          code_rating: response.code_rating,
          enhance_suggestion: response.enhance_suggestion,
          enhance_code: response.enhance_code,
          key_improvements: response.key_improvements,
          Mistakes: response.Mistakes,
          things_to_learn: response.things_to_learn,
        });
        setStateText("Results");
        setStage(1);
        setEnabled(true);
      }
    }
  };

  const handleSave = async () => {
    try {
      setEnabled(false)
      const res = await axios.post("/api/analytics", {
        binId: binId,
        language: language,
        userId: id,
        oldCode: code,
        key_improvements: data.key_improvements,
        Mistakes: data.Mistakes,
        things_to_learn: data.things_to_learn,
        code_rating: data.code_rating,
        enhance_suggestion: data.enhance_suggestion,
        enhance_code: data.enhance_code,
      });
      
      if (res.status === 200) {
      setSaved(true);
      setEnabled(false)
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      setEnabled(true)
    }
  };

  const handleRoute = () => {
    const encodedCode = btoa(code)
    // const encodedEnhance = btoa(data.enhanced_code)
    const encodedData = btoa(JSON.stringify(data))

    localStorage.setItem("code", encodedCode)
    // localStorage.setItem("enhance_code", encodedEnhance)
    localStorage.setItem("all_data", encodedData)

    router.push(
      `/differ?language=${language}&id=${id}&saved=${saved}`
    )
  }

  useEffect(() => {
    if (value) {
      setEnabled(true);
    }
  }, [value]);

  return (
    <div className="smped absolute bottom-8 right-6 w-1/3 min-h-36 max-h-[95vh] bg-[#2a2a2a] z-50 flex flex-col justify-between items-start gap-2.5 p-4">
      <div className="overflow-auto smped">
        <p className="text-xs text-neutral-400 uppercase">Dev Mentor Ai</p>
        <p className="my-2 mt-1">{StateText}</p>
        <hr />
        <div className="py-4 px-4">
          {stage === 1 && <DataAuditInsights data={data} />}
        </div>
      </div>

      {stage === 1 ? (
        <div className="w-full flex gap-2 justify-end items-end">
          <button 
            onClick={!enabled ? () => {} : () => close(false)}
          className={`${
              !enabled
                ? "opacity-60 cursor-not-allowed"
                : "opacity-100 cursor-pointer"
            } px-4 py-2 cursor-pointer hover:bg-neutral-800`}>
            Close
          </button>
          <button
            onClick={!enabled || saved ? () => {} : handleSave}
            className={`
            ${
              !enabled || saved
                ? "opacity-60 cursor-not-allowed"
                : "opacity-100 cursor-pointer"
            }
                bg-orange-600 hover:bg-orange-700
                px-4 py-2 flex items-center justify-center gap-2`}
          >
            {saved ? "Saved" : "Save"}
            {!enabled && !saved && <LucideLock size={14} />}
            {saved && <CheckCheck size={16} />}
          </button>
          <button
            onClick={handleRoute}
            className={`
            ${
              !enabled
                ? "opacity-60 cursor-not-allowed"
                : "opacity-100 cursor-pointer"
            }
                bg-orange-400 hover:bg-orange-600
                px-4 py-2 flex items-center justify-center gap-2`}
          >
            Enhance Code
            {!enabled && <LucideLock size={14} />}
          </button>
        </div>
      ) : (
        <div className="w-full flex gap-2 justify-end items-end">
          <button 
            onClick={!enabled ? () => {} : () => close(false)}
          className={`${
              !enabled
                ? "opacity-60 cursor-not-allowed"
                : "opacity-100 cursor-pointer"
            } px-4 py-2 cursor-pointer hover:bg-neutral-800`}>
            Close
          </button>
          <button
            onClick={!enabled ? () => {} : handleClick}
            className={`
            ${
              !enabled
                ? "opacity-60 cursor-not-allowed"
                : "opacity-100 cursor-pointer"
            }
                bg-orange-600 hover:bg-orange-700
                px-4 py-2 flex items-center justify-center gap-2`}
          >
            Analysis
            {!enabled && <LucideLock size={14} />}
          </button>
        </div>
      )}
    </div>
  );
}

export default SidePrompt;
