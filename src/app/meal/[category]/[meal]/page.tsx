"use client"
import Image from "next/image"
import React, { useEffect, useMemo, useState } from "react"

type PageProps = {
  params: Promise<{
    meal: string
    category: string
  }>
}

export default function MealPage({ params }: PageProps) {
  const { meal, category } = React.use(params)
  const [data, setData] = useState<Meal>()

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal.split("-")[1]}`)
      .then(res => res.json())
      .then(data => setData(data.meals[0]))
  }, [])

  const allIgredients = useMemo(() => {
    if(!data) return
    let result = []
    let dataKeys = Object.entries(data)
    for(let i = 0; i < dataKeys.length; i++) {
      if(dataKeys[i][0].includes("strIngredient") && dataKeys[i][1] !== "") {
        result.push(dataKeys[i])
      }
    }

    return result
  }, [data])

  const difficulty = useMemo(() => {
    const length = allIgredients?.length ?? 0;

    if (length === 0) return;
    switch (true) {
      case length >= 1 && length <= 5: // 1-5
        return "easy";
      case length >= 6 && length <= 10: //6-10
        return "medium";
      default:
        return "hard"; // 11+
    }
  }, [allIgredients]);

    
  if(!data) return <div className="flex flex-col p-16 font-medium"><p>Unfortunately, no recipe was found.</p></div>
  return (
    <div className="flex flex-col pl-32 pt-32 max-[768px]:pl-8 max-[768px]:pt-16">
      <div className="flex gap-7 max-[768px]:gap-3 w-full flex-wrap">
        <Image
          src={`${data.strMealThumb}/medium`}
          alt={data.strMeal}
          width={350}
          height={350}
          priority
          className="rounded-xl"
        />
        <div className="flex flex-col gap-1.5 p-3 h-full">
          <div className="flex gap-1 items-center">
            <h1 className="text-black text-xl font-semibold">{data.strMeal}</h1>
            <p className="opacity-70 text-black text-sm mt-auto">{data.strCategory}</p>
          </div>
          <div className="flex gap-2.5 flex-wrap">
            {data.strTags && data.strTags.split(",").map(
              (tag) => (
                <div
                  key={tag}
                  className="px-2.5 py-1 rounded-2xl bg-gray-200 w-fit"
                >
                  <span>{tag}</span>
                </div>
              )
            )}
          </div>
          <div className="mt-auto">
            <p className="text-black/80">
              {difficulty === "medium" ? `This meal is of ${difficulty} difficulty` :
              `This meal is ${difficulty} to cook.`}</p>
          </div>
        </div>
      </div>
    </div>
  )
}