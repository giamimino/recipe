"use client";
import { Session } from "@/app/api/session/route";
import { SessionContext } from "@/context/SessionContext";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SessionProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [session, setSession] = useState<Session | null>(null);
  const pathname = usePathname()
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

  useEffect(() => {
    if(pathname.startsWith("/meal/") || pathname.startsWith("/profile") || pathname.startsWith("/verify")) {
      const c = new URL(window.location.href)
      const meal = c.searchParams.get("meal")
      const date = c.searchParams.get("date")
      const del = c.searchParams.get("del")
      if(meal) {
        setSession(prev => prev ? {
          ...prev,
          saves: [
            ...(prev.saves ?? []),
            (meal && JSON.parse(meal))
          ]
        } : prev)
      } else if(del) {
        setSession(prev => prev ? {
          ...prev,
          saves: prev.saves?.filter(
            (s) => s.id !== del
          )
        } : prev)
      } else if(date) {
        setSession(prev => prev ? {
          ...prev,
          emailVerified: new Date(date)
        } : prev)
      }
      
      const url = new URL(window.location.href)
      url.searchParams.delete("meal")
      url.searchParams.delete("del")
      window.history.replaceState({}, "", url.toString());
    }
  }, [pathname])
  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
}
