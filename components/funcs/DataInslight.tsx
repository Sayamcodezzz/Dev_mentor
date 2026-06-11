"use client";

import React from "react";
import ReactMarkdown from "react-markdown";

interface MistakeItem {
  explanation: string;
  code_snippet: string;
}

interface AuditData {
  key_improvements?: string[];
  Mistakes?: MistakeItem[];
  things_to_learn?: string[];
  code_rating?: number;
  enhance_suggestion?: string[];
  enhanced_code?: string;
}

interface Props {
  data: AuditData;
}

const sectionConfigs = [
  {
    key: "key_improvements" as keyof AuditData,
    title: "Key Improvements",
    icon: "🔧",
    bgColor: "bg-neutral-800/50",
    borderColor: "border-amber-600/30",
    textColor: "text-amber-200",
    headerBg: "bg-gradient-to-r from-amber-600 to-amber-700",
    itemBorder: "border-amber-600/20",
    itemBg: "bg-neutral-700/20",
    glowColor: "shadow-amber-500/10"
  },
  {
    key: "Mistakes" as keyof AuditData,
    title: "Critical Issues",
    icon: "❌",
    bgColor: "bg-neutral-800/50",
    borderColor: "border-red-600/30",
    textColor: "text-red-200",
    headerBg: "bg-gradient-to-r from-red-600 to-red-700",
    itemBorder: "border-red-600/20",
    itemBg: "bg-neutral-700/20",
    glowColor: "shadow-red-500/10"
  },
  {
    key: "things_to_learn" as keyof AuditData,
    title: "Learning Path",
    icon: "📚",
    bgColor: "bg-neutral-800/50",
    borderColor: "border-blue-600/30",
    textColor: "text-blue-200",
    headerBg: "bg-gradient-to-r from-blue-600 to-blue-700",
    itemBorder: "border-blue-600/20",
    itemBg: "bg-neutral-700/20",
    glowColor: "shadow-blue-500/10"
  },
  {
    key: "enhance_suggestion" as keyof AuditData,
    title: "Enhancement Strategy",
    icon: "🚀",
    bgColor: "bg-neutral-800/50",
    borderColor: "border-emerald-600/30",
    textColor: "text-emerald-200",
    headerBg: "bg-gradient-to-r from-emerald-600 to-emerald-700",
    itemBorder: "border-emerald-600/20",
    itemBg: "bg-neutral-700/20",
    glowColor: "shadow-emerald-500/10"
  }
];

function CodeRatingCard({ rating }: { rating: number }) {
  const getRatingColor = (rating: number) => {
    if (rating >= 8) return "text-green-300 bg-green-900/20 border-green-600/50";
    if (rating >= 6) return "text-yellow-300 bg-yellow-900/20 border-yellow-600/50";
    if (rating >= 4) return "text-orange-300 bg-orange-900/20 border-orange-600/50";
    return "text-red-300 bg-red-900/20 border-red-600/50";
  };

  const getRatingText = (rating: number) => {
    if (rating >= 8) return "Excellent";
    if (rating >= 6) return "Good";
    if (rating >= 4) return "Needs Improvement";
    return "Poor";
  };

  const getRatingGradient = (rating: number) => {
    if (rating >= 8) return "from-green-600 to-green-700";
    if (rating >= 6) return "from-yellow-600 to-yellow-700";
    if (rating >= 4) return "from-orange-600 to-orange-700";
    return "from-red-600 to-red-700";
  };

  const getRatingGlow = (rating: number) => {
    if (rating >= 8) return "shadow-green-500/20";
    if (rating >= 6) return "shadow-yellow-500/20";
    if (rating >= 4) return "shadow-orange-500/20";
    return "shadow-red-500/20";
  };

  return (
    <div className={`rounded-xl border-2 p-6 shadow-xl backdrop-blur-sm ${getRatingColor(rating)} ${getRatingGlow(rating)}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-3 py-2 rounded-lg bg-gradient-to-r ${getRatingGradient(rating)} shadow-lg`}>
            <span className="text-xl">📊</span>
          </div>
          <h3 className="text-2xl font-bold text-white">Quality Score</h3>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold mb-1">{rating}/10</div>
          <div className="text-sm font-medium opacity-80">{getRatingText(rating)}</div>
        </div>
      </div>
      <div className="mt-4 bg-neutral-700/30 rounded-lg p-2">
        <div className={`h-2 rounded-full bg-gradient-to-r ${getRatingGradient(rating)} shadow-lg`} 
             style={{ width: `${(rating / 10) * 100}%` }}>
        </div>
      </div>
    </div>
  );
}

function EnhancedCodeCard({ code }: { code: string }) {
  return (
    <div className="rounded-xl border border-neutral-600/50 bg-neutral-800/50 shadow-xl backdrop-blur-sm">
      <div className="bg-gradient-to-r from-neutral-700 to-neutral-800 text-white px-6 py-4 rounded-t-xl border-b border-neutral-600/50">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 shadow-lg">
            <span className="text-xl">💻</span>
          </div>
          <h3 className="text-xl font-bold">Enhanced Code Solution</h3>
        </div>
      </div>
      <div className="p-6">
        <div className="relative">
          <pre className="bg-neutral-900 text-green-400 p-6 rounded-xl overflow-auto text-sm border border-neutral-700/50 shadow-inner">
            <code>{code}</code>
          </pre>
          <div className="absolute top-3 right-3 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MistakeItemComponent({ item, index }: { item: MistakeItem; index: number }) {
  return (
    <li className="border-l-4 border-red-600/50 pl-6 bg-neutral-700/20 rounded-r-xl p-4 backdrop-blur-sm hover:bg-neutral-700/30 transition-all duration-200 pr-4">
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 rounded-lg bg-red-600/20 border border-red-600/30 mt-1">
          <span className="text-red-400 text-sm font-bold">#{index + 1}</span>
        </div>
        <div className="flex-1 text-red-200 prose prose-invert prose-sm  text-sm max-w-none">
          <ReactMarkdown>{item.explanation}</ReactMarkdown>
        </div>
      </div>
      {item.code_snippet && (
        <div className="mt-4 ml-11">
          <div className="text-xs text-red-400 font-semibold mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            Problematic Code:
          </div>
          <pre className="smped bg-red-900/20 text-red-300 p-4 rounded-lg text-xs overflow-auto border border-red-600/30 shadow-inner">
            <code>{item.code_snippet}</code>
          </pre>
        </div>
      )}
    </li>
  );
}

function SimpleItemComponent({ item, index, textColor, itemBorder }: { 
  item: string; 
  index: number; 
  textColor: string;
  itemBorder: string;
}) {
  return (
    <li className={`border-l-4 ${itemBorder} pl-6 py-4 rounded-r-xl bg-neutral-700/20 backdrop-blur-sm hover:bg-neutral-700/30 transition-all duration-200 pr-4`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg bg-neutral-600/30 border ${itemBorder} mt-1`}>
          <span className={`${textColor} text-sm font-bold`}>#{index + 1}</span>
        </div>
        <div className={`flex-1 ${textColor} prose prose-invert prose-sm text-sm max-w-none`}>
          <ReactMarkdown>{item}</ReactMarkdown>
        </div>
      </div>
    </li>
  );
}

export default function DataAuditInsights({ data }: Props) {

  if (!data || typeof data !== 'object') {
    return (
      <div className="p-8 text-center">
        <div className="bg-neutral-800/50 rounded-xl p-8 border border-neutral-600/30 backdrop-blur-sm">
          <div className="text-6xl mb-4">📊</div>
          <p className="text-neutral-400 text-lg">No audit data available</p>
          <p className="text-neutral-500 text-sm mt-2">Please provide valid audit data to view insights</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8 max-w-7xl mx-auto">
      {data.code_rating && (
        <div className="mb-8">
          <CodeRatingCard rating={data.code_rating} />
        </div>
      )}

      <div className="grid gap-8">
        {sectionConfigs.map((section) => {
          const list = data[section.key];
          
          if (!list || !Array.isArray(list) || list.length === 0) {
            return null;
          }

          return (
            <div key={section.key} className={`rounded-xl shadow-2xl overflow-hidden border ${section.borderColor} backdrop-blur-sm ${section.glowColor}`}>
              <div className={`${section.headerBg} text-white px-8 py-6 shadow-lg`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                      <span className="text-lg">{section.icon}</span>
                    </div>
                    <h2 className="text-lg font-bold">{section.title}</h2>
                  </div>
                  <div className="text-xs flex items-center gap-1 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border-white/20">
                    <span className="font-semibold">
                      {list.length}
                    </span>
                    <span>items</span>
                  </div>
                </div>
              </div>
              
              <div className={`${section.bgColor} p-8 border-t border-neutral-600/20`}>
                <ul className="space-y-6">
                  {list.map((item, index) => {
                    const itemKey = `${section.key}-${index}`;
                    
                    if (section.key === "Mistakes" && typeof item === "object" && "explanation" in item) {
                      return (
                        <MistakeItemComponent 
                          key={itemKey} 
                          item={item as MistakeItem} 
                          index={index} 
                        />
                      );
                    }
                    
                    return (
                      <SimpleItemComponent 
                        key={itemKey} 
                        item={item as string} 
                        index={index}
                        textColor={section.textColor}
                        itemBorder={section.itemBorder}
                      />
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* {data.enhanced_code && (
        <div className="mt-12">
          <EnhancedCodeCard code={data.enhanced_code} />
        </div>
      )} */}
    </div>
  );
}