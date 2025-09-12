import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export interface Session {
  id: string,
  name: string,
  email: string,
  image: string,
  emailVerified: Date,
  saves?: Save[] | null,
}

type Save = {
  id: string,
  code: string,
  meal: string,
  thumb: string,
  category: string,
}

export async function GET() {
  try {
    const session = await auth()
    
    if(!session) {
      return NextResponse.json(null)
    }
    let saves = await prisma.user.findUnique({
      where: { id: session.user?.id },
      select: {
        emailVerified: true,
        saves: {
          select: {
            id: true,
            code: true,
            meal: true,
            thumb: true,
            category: true,
          }
        }
      }
    })

    return NextResponse.json({
      ...session.user,
      id: session.user?.id,
      emailVerified: saves?.emailVerified,
      saves: saves?.saves ?? [],
    })
  } catch (err) {
    console.error('Failed to get session:', err)
    return NextResponse.json({ error: 'Failed to get session' }, { status: 500 })
  }
}
