import React from 'react'

type PageProps = {
  params: {
    meal: string,
    category: string
  }
}

export default function MealPage({ params }: PageProps) {
  const  { meal, category } = params

  return (
    <div className='flex flex-col pt-20'>
      <h2>Category: {category}</h2>
      <h2>Meal: {meal}</h2>
    </div>
  )
}
