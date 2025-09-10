"use client"
import TextLoading from '@/components/ui/loading/TextLoading'
import SignOutButton from '@/components/ui/sign-out-button'
import { SessionContext } from '@/context/SessionContext'
import Image from 'next/image'
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
      <div>
        {session?.image && <Image
          src={session?.image}
          alt={session?.name ?? "avatar"}
          width={32}
          height={32}
          priority
        />}
      </div>
      <SignOutButton />
    </div>
  )
}
