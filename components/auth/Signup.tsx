"use client";

import React, { useState } from "react";
import AuthMain from "./Main";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Loader from "../pop/Loader";

type elementType = "LOGIN" | "SIGNUP" | "OTP";

function SignUp() {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [state, setState] = useState<elementType>("SIGNUP");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState(0);
  const [inOtp, setInOtp] = useState("");
  const [password, setPassword] = useState("");
  const [cnPassword, setCnPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setToken, setUser } = useAuth();

  const router = useRouter();

  const sendOtp = async () => {
    const usrEmail = email.trim();
    const usrName = name.trim();

    if (!usrEmail && !usrName) {
      setError("Fill all Details");
      return;
    }



    try {
    setLoading(true)
    setName(usrName);
    setError("")
    const checkEmail = await axios.get(`/api/user?gmail=${usrEmail}`)
    if (!checkEmail.data === null) {
      setError("User Already Exists...")
      return
    }

    const res = await axios.post("/api/otp", {
      email,
    });
    if (res.status === 200) {
      setOtp(res.data.OTP);
      setStep(1);
      setState("OTP");
      setLoading(false)
    } 
    } catch (error) {
      setError(error as string)
      setLoading(false)
    }
    finally {
      setLoading(false)
    }
  };

  const VerifyOtp = async () => {
    setError("")
    if (Number(inOtp) === Number(otp)) {
      setStep(2);
      setState("SIGNUP");
    } else {
      setError("Wrong OTP")
    }
  };
  const SignUp = async () => {
    setLoading(true)
    setError("")
    if (password !== cnPassword) {
      setError("Password didn't match");
      return;
    }
    try {
         const req = await axios.post("/api/user", {
      email: email,
      name: name,
      password: password,
      authType: "JWT"
    });
    if (req.status === 200) {
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
      setError(error as string)
      setLoading(false) 
    }
    finally {
      setLoading(false)
    }
  };

  return (
    <AuthMain error={error} element={state} buttonState={loading} state={step} action={step === 0 ? sendOtp : step === 1 ? VerifyOtp : step === 2 ? SignUp : () => {}}>
      {
      state === "OTP" ? (
        <input
          type="number"
          className="w-full py-3 bg-neutral-900 rounded-xl px-4 outline-none border-none text-2xl placeholder:text-lg text-center"
          placeholder="Enter OTP"
          value={inOtp}
          onChange={(e) => {
            const onlyDigits = e.target.value.replace(/\D/g, ""); // remove non-digits
            if (onlyDigits.length <= 6) {
              setInOtp(onlyDigits);
            }
          }}
          maxLength={6} // extra safety
          inputMode="numeric" // mobile numeric keyboard
          pattern="\d{6}" // HTML5 pattern for 6 digits
        />
      ) : (
        <div className="relative">
          <input
            type="text"
            value={step === 0 ? name : step === 2 ? password : ""}
            onChange={step === 0 ? (e) => setName(e.target.value) : step === 2 ? (e) => setPassword(e.target.value) : () => {}}
            placeholder={step === 0 ? "Full Name" : step === 2 ? "Password" : ""}
            className="w-full py-4 bg-neutral-900 rounded-xl px-4 outline-none border-none"
          />
          <input
            type="text"
            value={step === 0 ? email : step === 2 ? cnPassword : ""}
            onChange={step === 0 ? (e) => setEmail(e.target.value) : step === 2 ? (e) => setCnPassword(e.target.value) : () => {}}
            placeholder={step === 0 ? "Email" : step === 2 ? "Confirm Password" : ""}
            className="w-full py-4 bg-neutral-900 rounded-xl px-4 outline-none border-none my-4"
          />
        </div>
      )}
    
    </AuthMain>
  );
}

export default SignUp;
