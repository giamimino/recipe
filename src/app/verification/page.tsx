"use client"
import React, { useMemo } from 'react'

export default function Verification() {
  const user = useMemo(() => {
    const url = new URL(window.location.href)
    const m = url.searchParams.get("m")
    const id = url.searchParams.get("id")
    return {
      mail: m, id
    }
  }, [])
  if(!user) return
  
  return (
    <div className='p-14'>
        <div>
          <h1>{user.mail}</h1>
          <button>Send</button>
        </div>
        <div>
          <input type="text" />
          <button>Check</button>
        </div>
    </div>
  )
}
