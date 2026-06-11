"use client";

import React, { useState } from "react";
import AuthMain from "./Main";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

function Login() {
  const visible = false;
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setToken, setUser } = useAuth();
  const router = useRouter();

  async function HandleLogin() {
    const usrEmail = email.trim();
    const usrPass = pass.trim();

    if (!usrEmail || !usrPass) {
      return setError("Fill all credentials");
    }

    try {
      setLoading(true);
      setError("")
      const req = await axios.post("/api/login", {
        email: email,
        password: pass,
      });
      if (req.status === 404) {
        setError("User Not Found");
        return
      } else if (req.status === 401) {
        setError("Wrong password");
        return
      } else if (req.status === 400) {
        setError(req.data.error)
        return
      }
      else if (req.status === 200) {
        const token = req.data.token;
        document.cookie = `token=${token}; path=/; max-age=604800`; // 7 days
        localStorage.setItem(
          "token",
          JSON.stringify({
            value: token,
            createdAt: Date.now(),
          })
        );
        setToken(req.data.token);
        setUser({
          id: req.data.user.id,
          email: req.data.user.email,
          name: req.data.user.name,
        });
        setLoading(false);
        router.replace("/dashboard");
      }
    } catch (error) {
      console.log(error);
      setError(error as string);
    } finally {
      setLoading(false);
    }
  }
  return (
    <AuthMain element="LOGIN" action={HandleLogin} buttonState={loading} error={error}>
      <input
        required
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="email"
        className="w-full py-4 bg-neutral-900 rounded-xl px-4 outline-none border-none"
      />
      <div className="relative">
        <input
          required
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="password"
          className="w-full py-4 bg-neutral-900 rounded-xl px-4 outline-none border-none mt-4 relative"
        />

        <div className="absolute w-6 h-6 right-4 top-[45%] bg-neutral-900">
          {visible ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
              <rect width="256" height="256" fill="none" />
              <path
                d="M32,104c16.81,20.81,47.63,48,96,48s79.19-27.19,96-48"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
              <line
                x1="224"
                y1="168"
                x2="200.62"
                y2="127.09"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
              <line
                x1="160"
                y1="192"
                x2="152.91"
                y2="149.45"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
              <line
                x1="96"
                y1="192"
                x2="103.09"
                y2="149.45"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
              <line
                x1="32"
                y1="168"
                x2="55.38"
                y2="127.09"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
              <rect width="256" height="256" fill="none" />
              <path
                d="M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
              <circle
                cx="128"
                cy="128"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
            </svg>
          )}
        </div>
      </div>
      {/* </input> */}

      <p className="text-right text-neutral-500 text-sm py-2 underline">
        Forget Password?
      </p>
    </AuthMain>
  );
}

export default Login;
