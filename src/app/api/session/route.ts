import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export interface Session {
  name: string,
  email: string,
  image: string,
}

export async function GET() {
  try {
    const session = await auth()

    if(!session) {
      return NextResponse.json(null)
    }

    return NextResponse.json(session?.user)
  } catch (err) {
    console.error('Failed to get session:', err)
    return NextResponse.json({ error: 'Failed to get session' }, { status: 500 })
  }
}
