"use client"
import TextLoading from '@/components/ui/loading/TextLoading'
import SignOutButton from '@/components/ui/sign-out-button'
import { SessionContext } from '@/context/SessionContext'
import React, { useContext } from 'react'

export default function Profile() {
  const session = useContext(SessionContext)
  return (
    <div className='p-14 flex flex-col gap-2'>
      <div>
        {session?.name ? (
          <p>{session.name}</p>
        ) : <TextLoading />}
      </div>
      <SignOutButton />
    </div>
  )
}
