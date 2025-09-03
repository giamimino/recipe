import { NextResponse } from "next/server";

function errorResponse(message: string) {
  return NextResponse.json({
    success: false,
    message
  })
}

export async function GET() {
  try {
    const requests = Array.from({ length }, () =>
      fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(res => res.json())
        .then(data => data.meals[0])
    );

    const results = await Promise.all(requests);
  } catch (err) {
    console.log(err);
    return errorResponse("Something went wrong.")
  }
}