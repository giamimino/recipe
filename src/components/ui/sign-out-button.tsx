import { logout } from '@/lib/actions/auth'
import React from 'react'

export default function SignOutButton() {
  return (
    <button onClick={() => logout()}>Sign In</button>
  )
}
