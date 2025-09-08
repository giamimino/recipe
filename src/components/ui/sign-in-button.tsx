"use client"
import { login } from '@/lib/actions/auth'
import React from 'react'

export default function SignInButton() {
  return (
    <button onClick={() => login()}>Sign In</button>
  )
}
