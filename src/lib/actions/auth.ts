"use server"
import { signOut } from "next-auth/react"
import { signIn } from "../auth"

export const login = async () => {
  await signIn("github", { redirectTo: "/profile" })
}

export const logout = async () => {
  await signOut({ redirectTo: "/profile" })
}