"use client";

import { useAuth } from "@/context/AuthContext";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import SupportForm from "./supportForm";
import axios from "axios";
import MessageLoader from "@/components/pop/messageLoader";

function Support() {
  const { data: session, status } = useSession();
  const { user } = useAuth();
  const [sent, setSent] = useState(false)
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    subject: "",
    relatedTo: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    const id = userData.id.trim();
    const name = userData.name.trim();
    const email = userData.email.trim();
    const subject = userData.subject.trim();
    const relatedTo = userData.relatedTo.trim();
    const message = userData.message.trim();
    if (!id && !name && !email && !subject && !relatedTo && !message) {
      return;
    }

    setLoading(true);
    const sendEmail = await axios.post("/api/support", {
      from: id,
      name: name,
      email: email,
      subject: subject,
      relatedTo: relatedTo,
      message: message,
    });

    if (sendEmail.status === 200) {
      setLoading(false);
      setSent(true)
    //   window.location.reload();
    }
  };
  useEffect(() => {
    if (status === "authenticated") {
      setUserData((prev) => ({
        ...prev,
        id: session.user.id,
        name: session.user?.name as string,
        email: session.user?.email as string,
      }));
    } else {
      setUserData((prev) => ({
        ...prev,
        id: user?.id as string,
        name: user?.name as string,
        email: user?.email as string,
      }));
    }
  }, [session, user]);
  return loading ? (
    <MessageLoader />
  ) : (
    <>
    {
      sent && <h1 className="text-base text-red-400 px-9">Your message has been sent to admin, You will receive reply over your mail({userData.email}) within 24hr.</h1>
    }
    <SupportForm
      message={userData.message}
      topic={userData.relatedTo}
      subject={userData.subject}
      onClick={handleSend}
      change={setUserData}
      />
      </>
  );
}

export default Support;
