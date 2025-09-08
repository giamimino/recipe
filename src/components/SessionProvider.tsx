"use client";
import { SessionContext } from "@/context/SessionContext";
import React, { useEffect, useState } from "react";

export default function SessionProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [session, setSession] = useState(null);
  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch("/api/session")
      const data = await res.json();
      if(data) {
        setSession(data)
      }
    };

    fetchSession();
  }, []);
  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
}
