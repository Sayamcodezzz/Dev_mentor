"use client";

import Loader from "@/components/pop/Loader";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import {
  Fingerprint,
  GitMergeIcon,
  LucideArrowRight,
  LucideCheckCircle,
  LucidePencilLine,
  SquareTerminal,
  X,
} from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface DataObj {
  analytics: any[];
  authType: string;
  email: string;
  id: string;
  name: string;
  password: null;
  snippets: any[];
  snippetsId: null;
}

function Profile() {
  const [data, setData] = useState<DataObj | null>(null);
  const [updating, setUpdating] = useState(false);
  const [loading, setLoading] = useState(false);

  const [otp, setOtp] = useState(0);
  const [inpOtp, setInOtp] = useState<number>();

  const [stage, setStage] = useState<0 | 1 | 2>(0);

  const { data: session, status } = useSession();
  const [name, setName] = useState({
    edit: false,
    value: "",
  });
  const [email, setEmail] = useState({
    edit: false,
    value: "",
  });
  const { user } = useAuth();
  const [id, setId] = useState("");

  const fetchData = async () => {
    setLoading(true);
    const res = await axios.get(`/api/userBin?id=${id}`);
    if (res.status === 200) {
      console.log(res.data.data[0]);
      setName((prev) => ({ ...prev, value: res.data.data[0].name }));
      setEmail((prev) => ({ ...prev, value: res.data.data[0].email }));
      setData(res.data.data[0]);
      setLoading(false);
    }
  };

  const handleNameChange = async () => {
    setUpdating(true);
    const res = await axios.put(`/api/user?id=${id}`, {
      name: name.value,
    });
    if (res.status === 200) {
      setUpdating(false);
      setName((prev) => ({ ...prev, edit: false }));
      fetchData();
    }
  };

  const verifyOtp = async () => {
    setUpdating(true);
    if (inpOtp === otp) {
      setStage(2);
      const res = await axios.put(`/api/user?id=${id}`, {
        email: email.value,
      });
      if (res.status === 200) {
        setEmail((prev) => ({ ...prev, edit: false }));
        setUpdating(false);
        fetchData();
      }
    }
  };

  const handleSendOTP = async () => {
    setUpdating(true);
    const res = await axios.post(`/api/otp`, {
      email: email.value,
    });
    if (res.status === 200) {
      setStage(1);
      setOtp(res.data.OTP);
      setUpdating(false);
    }
  };

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
  return data ? (
    <div className="">
      <div className="flex justify-start items-center gap-2.5">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-neutral-700 grid place-items-center">
        <h1 className="text-6xl font-bold">{data.name.charAt(0).toUpperCase()}</h1>
        </div>
        <div className="ml-2">
          <div className="flex justify-start items-center gap-4">
            <input
              readOnly={!name.edit}
              onChange={(e) =>
                setName((prev) => ({ ...prev, value: e.target.value }))
              }
              className={`bg-neutral-700 outline-none px-4 w-72 py-3.5 rounded-lg ${
                name.edit ? "cursor-auto" : "cursor-not-allowed"
              }`}
              placeholder="Full Name"
              value={name.value}
            />{" "}
            {name.edit ? (
              updating ? (
                "..."
              ) : (
                <>
                  <LucideCheckCircle
                    onClick={handleNameChange}
                    className="text-green-400 cursor-pointer"
                    size={20}
                  />
                  <X
                    onClick={() =>
                      setName((prev) => ({
                        ...prev,
                        edit: false,
                        value: data.name,
                      }))
                    }
                    className="text-red-400 cursor-pointer"
                    size={20}
                  />
                </>
              )
            ) : (
              <LucidePencilLine
                onClick={() =>
                  setName((prev) => ({ ...prev, edit: true, value: "" }))
                }
                size={16}
                className={`text-neutral-500 hover:text-neutral-300 cursor-pointer`}
              />
            )}
          </div>
          <br />
          <div className="flex justify-start items-center gap-4">
            {stage === 1 ? (
              <input
                type="number"
                className="bg-neutral-700 outline-none px-4 w-72 py-3.5 rounded-lg"
                placeholder="Enter OTP"
                value={inpOtp ?? ""}
                onChange={(e) => {
                  const onlyDigits = e.target.value.replace(/\D/g, ""); // remove non-digits
                  if (onlyDigits.length <= 6) {
                    setInOtp(Number(onlyDigits));
                  }
                }}
                maxLength={6} // extra safety
                inputMode="numeric" // mobile numeric keyboard
                pattern="\d{6}" // HTML5 pattern for 6 digits
              />
            ) : (
              <input
                readOnly={!email.edit}
                onChange={(e) =>
                  setEmail((prev) => ({ ...prev, value: e.target.value }))
                }
                className={`bg-neutral-700 outline-none px-4 w-72 py-3.5 rounded-lg ${
                  email.edit ? "cursor-auto" : "cursor-not-allowed"
                }`}
                placeholder="Email"
                value={email.value}
              />
            )}

            {email.edit ? (
              updating ? (
                "..."
              ) : (
                <>
                  {stage === 0 ? (
                    <LucideArrowRight
                      onClick={handleSendOTP}
                      className="text-yellow-400 cursor-pointer"
                      size={24}
                    />
                  ) : (
                    <LucideCheckCircle
                      onClick={stage === 1 ? verifyOtp : () => {}}
                      className="text-green-400 cursor-pointer"
                      size={20}
                    />
                  )}
                  <X
                    onClick={() =>
                      setEmail((prev) => ({
                        ...prev,
                        edit: false,
                        value: data.email,
                      }))
                    }
                    className="text-red-400 cursor-pointer"
                    size={20}
                  />
                </>
              )
            ) : (
              <LucidePencilLine
                onClick={() =>
                  setEmail((prev) => ({ ...prev, edit: true, value: "" }))
                }
                size={16}
                className={`text-neutral-500 hover:text-neutral-300 cursor-pointer`}
              />
            )}
          </div>

        </div>
      </div>

      <h1 className="text-3xl py-2 font-bold mt-8 mb-1">Account Statistics</h1>
      <div className="w-full h-40 flex justify-start items-center gap-3">
        <div className="w-1/2 h-full bg-purple-300/20 rounded-2xl p-4 px-6">
          <h1 className="text-purple-300 text-xl font-bold">
            Total No. of Snippets
          </h1>
          <div className="flex justify-between items-center h-5/6">
            <SquareTerminal size={50} className="font-light text-purple-300" />
            <h1 className="text-purple-300 text-5xl font-semibold pr-10">
              {data.snippets.length}
            </h1>
          </div>
        </div>
        <div className="w-1/2 h-full bg-orange-300/20 rounded-2xl p-4">
          <h1 className="text-orange-300 text-xl font-bold">
            Total No. of Analytics
          </h1>
          <div className="flex justify-between items-center h-5/6">
            <GitMergeIcon size={50} className="font-light text-orange-300" />
            <h1 className="text-orange-300 text-5xl font-semibold pr-10">
              {data.analytics.length}
            </h1>
          </div>
        </div>
        <div className="w-1/2 h-full bg-green-300/20 rounded-2xl p-4">
          <h1 className="text-green-300 text-xl font-bold">
            Authenticatied via
          </h1>
          <div className="flex justify-between items-center h-5/6">
            <Fingerprint size={50} className="font-light text-green-300" />
            <h1 className="text-green-300 text-4xl font-semibold pr-10">
              {data.authType.charAt(0).toUpperCase() +
                data.authType.slice(1).toLowerCase()}
            </h1>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p>NO Data Found</p>
  );
}

export default Profile;
