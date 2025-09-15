"use client"
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function notFound() {
  const router = useRouter()

  useEffect(() => {
    router.push("/")
  }, [])
  return (
    <div className='p-14'>
      {"404 page can't be found"}
    </div>
  )
}
