"use server"
import { auth } from '@/lib/auth'

export default async function HWWwddad() {
  const session = await auth()
  console.log(session);
  
  return (
    <div>HWWwddad</div>
  )
}
