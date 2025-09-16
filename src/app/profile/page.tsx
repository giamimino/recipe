"use client"
import TextLoading from '@/components/ui/loading/TextLoading'
import SignOutButton from '@/components/ui/sign-out-button'
import { SessionContext } from '@/context/SessionContext'
import { removeSaveMeal } from '@/lib/actions/actions'
import { Icon } from '@iconify/react/dist/iconify.js'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'

export default function Profile() {
  const [message, setMessage] = useState("")
  const session = useContext(SessionContext)
  const router = useRouter()
  
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

  const handleSend = async () => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify({ email: session?.email, userId: session?.id})
    })
    const result = await res.json()
    if(result.success) {
      setMessage(result.message ?? "Verification email sent.")
    } else {
      alert(result.message ?? "Something went wrong.")
    }
  }

  return (
    <div className='p-14 max-[475px]:px-4 max-[475px]:pt-14 flex flex-col gap-2'>
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
            <div className='flex gap-0.5 items-center max-[475px]:flex-wrap'>
              <p>{session.email}</p>
              {session.emailVerified ? (
                <p className='font-bold'>
                  Verified!
                </p>
              ) : (
                <button
                  className='text-blue-500 underline hover:text-blue-600'
                  onClick={() => handleSend()}
                >
                  Verify your email
                </button>
              )}
            </div>
          </>
        ) : <TextLoading />}
      </div>
      {message !== "" && (
        <p>{message}</p>
      )}
      {session?.saves && session?.saves?.length > 0 && (
        <div className='flex flex-col gap-1'>
          <h1 className='text-xl font-semibold'>Saves</h1>
          <div className='flex flex-col gap-2 select-none'>
            {session.saves.map((s) => (
              <div
                key={s.meal}
                className='flex justify-between gap-5 hover:outline-none hover:ring-2 
                hover:ring-offset-2 hover:ring-black-500 rounded-md cursor-pointer transition'
              >
                <div className='flex gap-2.5'>
                  <Image
                    src={`${s.thumb}/small`} 
                    alt={s.meal ?? "meal-thumb"}
                    width={48}
                    height={48}
                    className='rounded-xl'
                    onClick={() => router.push(`/meal/${s.category.toLowerCase()}/${s.code}-${s.meal}`)}
                  />
                  <div className='flex flex-col'>
                    <h1 className='font-medium text-black'>{s.meal}</h1>
                    <p className='text-black/80 text-sm'>{s.category}</p>
                  </div>
                </div>
                <button onClick={() => handleRemove(s.id)} className='text-red-600 cursor-pointer'>
                  <Icon icon={'mdi:heart'} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      <SignOutButton />
    </div>
  )
}
