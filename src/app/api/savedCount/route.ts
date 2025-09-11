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

    if (!mealCode || !meal) {
      return NextResponse.json(
        { error: "mealCode and meal are required" },
        { status: 400 }
      );
    }

    const count = await prisma.save.count({
      where: {
        code: mealCode,
        meal: { equals: meal, mode: "insensitive" },
      },
    }) ?? 0;


    if(!count) {
      return errorResponse("can't count this meal saves")
    }

    return NextResponse.json({
      success: true,
      count
    })
  } catch (err) {
    console.log(err);
    return errorResponse("Something went wrong.")
  }
}