"use client"
import React, { useEffect, useMemo, useState } from 'react'

export default function Verification() {
  const [loading, setLoading] = useState(true)
  const token = useMemo(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href)
      const token = url.searchParams.get("token")
      const id = url.searchParams.get("id")
      return { token, id }
    }
  }, [])

  useEffect(() => {
    if(!token) return;
    setLoading(true)
    fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify({ token: token.token, userId: token.id})
    }).then(res => res.json())
    .then(result => {
      if(result.success) {
        const url = new URL(window.location.href);
        url.searchParams.set("date", result.date)
        window.history.replaceState({}, "", url)
      } else {
        alert(result.message ?? "Something went wrong.")
      }
    })
    setLoading(false)
  }, [token])

  if(loading) return (
    <div className='w-full h-full fixed z-98 bg-gray-200 animate-pulse flex justify-center items-center gap-1'>
      <span className='w-4 h-4 bg-black rounded-full animate-bounce'></span>
      <span className='w-4 h-4 bg-black rounded-full animate-bounce [animation-delay:100ms]'></span>
      <span className='w-4 h-4 bg-black rounded-full animate-bounce [animation-delay:200ms]'></span>
    </div>
  )
  return (
    <div className='p-14'>
        <div>
          <h1>{}</h1>
          <button>Send</button>
        </div>
    </div>
  )
}
