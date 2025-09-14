import { send } from "@/lib/send";
import { generateEmailToken } from "@/utils/jwt";
import { NextResponse } from "next/server";

const errorResponse = (message: string) => {
  return NextResponse.json({
    success: false,
    message
  })
}

export async function POST(req: Request) {
  try {
    const { email, userId }: {email: string, userId: string} = await req.json();
    const token = generateEmailToken(email);
  
    const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${token}&id=${userId}`;
    const res = await send(email, verifyUrl);
    if(!res.success) {
      return errorResponse("Failed to send verification email.")
    }
    return NextResponse.json({ success: true, message: "Verification email sent." });
  }catch(err) {
    console.log(err);
    return errorResponse("Something went wrong.")
  }
}
