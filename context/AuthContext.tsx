"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useEffect, useState } from "react";

type userType = {
  id: string;
  email: string;
  name: string;
};

type AuthContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
  user: userType | null;
  setUser: (user: userType | null) => void
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<userType | null>(null);
  const {data: session, status} = useSession()

async function GetUser() {
  const storedToken = localStorage.getItem("token");

  if (!storedToken) return false;

  const { value, createdAt } = JSON.parse(storedToken);
  const ageInDays = (Date.now() - createdAt) / (1000 * 60 * 60 * 24);

  if (ageInDays >= 7) {
    // Token expired
    localStorage.removeItem("token");
    setToken(null);
    document.cookie = "token=; max-age=0; path=/"; // clear cookie
    return false;
  }

  setToken(value); // ✅ Only set valid token

  if (user) return false; // If user already exists, don't fetch again

  try {
    const getUser = await axios.get("/api/user/tken", {
      headers: {
        Authorization: `Bearer ${value}`, // ✅ Correct token
      },
    });

    if (getUser.status === 200) {
      setUser({
        id: getUser.data.data.id,
        email: getUser.data.data.email,
        name: getUser.data.data.name,
      });
    }
  } catch (err) {
    console.error("Error fetching user:", err);
    // optional: clean up token if invalid
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    document.cookie = "token=; max-age=0; path=/";
  }
}

useEffect(() => {
  if (status === "loading") {
    return
  }
  if (status === "authenticated") {
    return
  }
  if (!session) {
    GetUser()
  }
}, [session])

  return (
    <AuthContext.Provider value={{ setUser, token, setToken, user }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
