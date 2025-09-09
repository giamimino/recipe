"use client"
import { logout } from '@/lib/actions/auth'
import React from 'react'

export default function SignOutButton() {
  return (
    <button onClick={() => logout()}
    className="inline-flex cursor-pointer items-center gap-3 px-4 py-2 rounded-md font-medium transition
    bg-red-600 text-white shadow-sm w-fit
    hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Sign Out</button>
  )
}
