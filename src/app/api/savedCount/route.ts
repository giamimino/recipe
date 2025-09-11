import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

function errorResponse(message: string) {
  return NextResponse.json({
    success: false,
    message
  })
}

export async function POST(req: Request) {
  try {
    const { meal, mealCode }: { meal: string, mealCode: string } = await req.json()

    const count = await prisma.save.count({
      where: {
        code: mealCode,
        meal: meal.toLowerCase()
      }
    })

    if(!count) {
      return errorResponse("can't count this meal saves")
    }

    return {
      success: true,
      count
    }
  } catch (err) {
    console.log(err);
    return errorResponse("Something went wrong.")
  }
}