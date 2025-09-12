"use client"
import TextLoading from '@/components/ui/loading/TextLoading'
import SignOutButton from '@/components/ui/sign-out-button'
import { SessionContext } from '@/context/SessionContext'
import { removeSaveMeal } from '@/lib/actions/actions'
import { Icon } from '@iconify/react/dist/iconify.js'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect } from 'react'

export default function Profile() {
  const session = useContext(SessionContext)
  
  const handleRemove = async (id: string) => {
    const result = await removeSaveMeal(id)

    if(result.success && result.id) {
      const url = new URL(window.location.href)
      url.searchParams.set("del", result.id?.id)
      window.history.replaceState({}, "", url)
    } else {
      alert(result.message || 'Something went wrong.')
    }
  }

  return (
    <div className='p-14 flex flex-col gap-2'>
      <div className='flex items-center gap-2.5'>
        <div>
          {session?.image && <Image
            src={session?.image}
            alt={session?.name ?? "avatar"}
            width={52}
            height={52}
            className='rounded-xl'
            priority
          />}
        </div>
        {session?.name ? (
          <p>{session.name}</p>
        ) : <TextLoading />}
      </div>
      <h1 className='font-semibold text-xl '>Info</h1>
      <div className='flex items-center gap-2.5'>
        {session?.email ? (
          <>
            <Icon icon={'tabler:mail-filled'} />
            <div className='flex gap-0.5 items-center'>
              <p>{session.email}</p>
              {session.emailVerified ? (
                <p className='font-bold'>
                  Verified!
                </p>
              ) : (
                <Link
                  href={`/verification?m=${session.email}&id=${session.id}`}
                  className='text-blue-500 underline hover:text-blue-600'
                >
                  Verify your email
                </Link>
              )}
            </div>
          </>
        ) : <TextLoading />}
      </div>
      <div>
        {session?.saves?.map((s) => (
          <div
            key={s.meal}
          >
            <div>
              <Image
                src={s.thumb} 
                alt={''}
                width={48}
                height={48}
              />
              <div>
                <h1>{s.meal}</h1>
                <p>{s.category}</p>
              </div>
            </div>
            <button onClick={() => handleRemove(s.id)}>
              <Icon icon={'mdi:heart'} />
            </button>
          </div>
        ))}
      </div>
      <SignOutButton />
    </div>
  )
}
