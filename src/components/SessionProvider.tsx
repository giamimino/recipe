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
  const searchParams = useSearchParams()
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
    if(pathname.startsWith("/meal/") || pathname.startsWith("/profile")) {
      const meal = searchParams.get("meal")
      console.log(meal);
      const del = searchParams.get("del")
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
      }
      
      const url = new URL(window.location.href)
      url.searchParams.delete("meal")
      url.searchParams.delete("del")
      window.history.replaceState({}, "", url.toString());
    }
  }, [pathname, searchParams])
  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
}
