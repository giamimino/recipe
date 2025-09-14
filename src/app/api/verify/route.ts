import { prisma } from "@/lib/prisma";
import { verifyEmailToken } from "@/utils/jwt";
import { NextResponse } from "next/server";

function errorResponse(message: string) {
  return NextResponse.json({
    success: false,
    message
  })
}

export async function POST(req: Request) {
  try {
    const { token, userId }: { token: string, userId: string } = await req.json();
    const paylod = verifyEmailToken(token);
    const date = new Date()
    if(!paylod) {
      return errorResponse("Verification link not found or expired.")
    }
    const userUpdate = await prisma.user.update({
      where: { id: userId },
      data: {
        emailVerified: date
      },
      select: {
        id: true
      }
    })
    if(!userUpdate) {
      return errorResponse("Verification link not found or expired.")
    }

    return NextResponse.json({
      success: true,
      date
    })
  } catch (err) {
    console.log(err);
    return errorResponse("Something went wrong.")
  }
}