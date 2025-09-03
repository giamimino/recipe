import React from 'react'

type PageProps = {
  params: {
    category: string,
    meal: string,
  }
}

export default function MealPage({ params }: PageProps) {
  const  { category, meal } = params

  return (
    <div>
      <h1>Category: {category}</h1>
      <h2>Meal: {meal}</h2>
    </div>
  )
}
