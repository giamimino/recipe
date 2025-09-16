"use client";
import { Session } from "@/app/api/session/route";
import { SessionContext } from "@/context/SessionContext";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SessionProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [session, setSession] = useState<Session | null>(null);
  const pathname = usePathname()
  const searchParams = useSearchParams();

  const meal = searchParams.get("meal") ?? null;
  const date = searchParams.get("date") ?? null;
  const del = searchParams.get("del") ?? null;
  
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
      url.searchParams.delete("date")
      window.history.replaceState({}, "", url.toString());
    }
  }, [pathname, meal, date, del])
  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
}