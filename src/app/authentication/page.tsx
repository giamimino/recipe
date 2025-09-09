import SignInButton from '@/components/ui/sign-in-button'
import React from 'react'

export default function AuthPage() {
  return (
    <div>
      <div className='flex flex-col absolute top-1/2 left-1/2 -translate-1/2 gap-2.5'>
        <SignInButton provider={"google"} />
        <span className='text-center text-black/80'>or</span>
        <SignInButton provider={"github"} />
      </div>
    </div>
  )
}
