"use client";

import { getNav } from "@/context/DashboardContext";
import logo from "@/public/logo.png"
import Link from "next/link";
import React from "react";
import {
  ChartSpline,
  DoorOpen,
  Headset,
  Home,
  LucideCode2,
  User,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
function SideBar() {
  const root = "/dashboard";
  const options = [
    {
      name: "My Snippets",
      Icon: LucideCode2,
      path: `${root}/snippets`,
    },
    {
      name: "Code Analytics",
      Icon: ChartSpline,
      path: `${root}/analytics`,
    },
  ];
  const profileOptions = [
    {
      name: "Profile",
      Icon: User,
      path: `${root}/profile`,
    },
    {
      name: "Report a Bug",
      Icon: Headset,
      path: `${root}/support`,
    },
    {
      name: "Logout",
      Icon: DoorOpen,
      path: `/auth/login`,
    },
  ];
  const { active, setActive } = getNav();
  const router = useRouter()
  const {status} = useSession()

  const handleLogout = () => {
    if (status === "authenticated") {
      signOut();
    } 
    localStorage.removeItem("token")
    document.cookie = 'token=; path=/; max-age=0';
    router.push("/auth/login")

  }
  return (
    <div className="Sidebar w-1/6 h-full bg-neutral-700/20 rounded-3xl flex flex-col justify-between items-start p-4">
      <div className="w-full h-1/4">
      <Image 
      src={logo.src}
      className="w-full h-full object-cover pt-4"
      width={logo.width}
      height={logo.height}
      alt="LOGO"
      />
      </div>
      <ul className="h-1/2 mt-4 w-full flex flex-col gap-2">
        <p className="py-1 font-bold text-2xl">Dashboard</p>
        {options.map((items, idx) => (
          <Link
            onClick={() => setActive(items.path)}
            href={items.path}
            key={idx}
            className={`w-full px-3.5 py-2.5
                ${
                  active === items.path
                    ? "bg-amber-500/20 text-amber-400 font-semibold"
                    : "text-neutral-200 hover:bg-amber-600/10 hover:text-amber-300"
                }  rounded-lg text-lg flex justify-start items-center gap-3`}
          >
            <items.Icon size={20} /> {items.name}
          </Link>
        ))}
      </ul>
      {/* <div className="w-full h-1/3"> */}
      <ul className="h-1/3 w-full flex flex-col justify-end mb-8 items-start gap-2">
        <p className="font-semibold text-lg">Settings</p>
        {profileOptions.map((items, idx) =>
          items.name === "Logout" ? (
            <div
              onClick={handleLogout}
              key={idx}
              className={`w-full px-3.5 py-2.5 cursor-pointer
                ${
                  active === items.name
                    ? "bg-amber-500/20 text-amber-400 font-semibold"
                    : "text-neutral-200 hover:bg-amber-600/10 hover:text-amber-300"
                }  
              ${
                items.name === "Logout"
                  ? "bg-red-700/20 text-red-500 hover:bg-red-800/40 hover:text-red-400"
                  : ""
              }
              rounded-lg text-lg flex justify-start items-center gap-3
              `}
            >
              <items.Icon size={20} /> {items.name}
            </div>
          ) : (
            <Link
              href={items.path}
              key={idx}
              onClick={() => setActive(items.path)}
              className={`w-full px-3.5 py-2.5
                ${
                  active === items.path
                    ? "bg-amber-500/20 text-amber-400 font-semibold"
                    : "text-neutral-200 hover:bg-amber-600/10 hover:text-amber-300"
                }  
              ${
                items.name === "Logout"
                  ? "bg-red-700/20 text-red-500 hover:bg-red-800/40 hover:text-red-400"
                  : ""
              }
              rounded-lg text-lg flex justify-start items-center gap-3
              `}
            >
              <items.Icon size={20} /> {items.name}
            </Link>
          )
        )}
      </ul>
    </div>
  );
}

export default SideBar;
