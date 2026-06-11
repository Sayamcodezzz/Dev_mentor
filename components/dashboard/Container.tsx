"use client";

import { getNav } from "@/context/DashboardContext";
import React, { useEffect, useState } from "react";

function Container({ children }: { children: React.ReactNode }) {
  const date = new Date();
  const getyear = date.getFullYear();
  const getmonth = date.getMonth();
  const getDate = date.getDate();

  let hour = date.getHours();
  let min = date.getMinutes();
  const { active } = getNav();

  const [title, setTitle] = useState("Dashboard");

  useEffect(() => {
    switch (active) {
      case "/dashboard/snippets":
        setTitle("Snippets");
        break;
      case "/dashboard/analytics":
        setTitle("Analytics");
        break;

      case "/dashboard/profile":
        setTitle("Account Settings");
        break;
      case "/dashboard/support":
        setTitle("Report a Bug");
        break;
      default:
        setTitle("Dashboard");
        break;
    }
  }, [active]);

  useEffect(() => {
    hour = date.getHours();
    min = date.getMinutes();
  }, [hour, min]);
  return (
    <div className="w-5/6 h-full">
      <div className="w-full h-1/12 rounded-2xl mb-4 flex justify-between items-end px-2 pr-2">
        <h1 className="text-4xl font-bold">{title}</h1>
        <div className="py-4 bg-neutral-700 rounded-xl px-4 text-sm text-neutral-300">
          {getDate}/{getmonth}/{getyear} - {hour}:{min}
        </div>
      </div>
      <div className="w-full bg-neutral-800 h-[89%] rounded-2xl p-10 overflow-auto smped">
        {children}
      </div>
    </div>
  );
}

export default Container;
