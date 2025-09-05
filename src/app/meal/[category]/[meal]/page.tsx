"use client"

import React from "react"

type PageProps = {
  params: Promise<{
    meal: string
    category: string
  }>
}

export default function MealPage({ params }: PageProps) {
  const { meal, category } = React.use(params)

  const [id, ...mealParts] = meal.split("-")
  const mealName = mealParts.join(" ")

  return (
    <div className="flex flex-col pt-20">
      <h2>Category: {category}</h2>
      <h2>ID: {id}</h2>
      <h2>Meal: {mealName}</h2>
    </div>
  )
}
