"use client"
import SignInButton from '@/components/ui/sign-in-button'
import { SessionContext } from '@/context/SessionContext'
import React, { useContext } from 'react'

export default function Profile() {
  const session = useContext(SessionContext)
  return (
    <div className='mt-100'>
      <SignInButton />
        <div>
          <p>{session?.name ?? "no "}</p>
        </div>
    </div>
  )
}
