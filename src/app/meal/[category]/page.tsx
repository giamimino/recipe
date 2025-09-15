"use client"
import ForYouLoading from '@/components/ui/loading/ForYouLoading'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
const Meal = dynamic(() => import('@/components/ui/meal'), {
  ssr: false
})

type PagePramas = {
  params: Promise<{
    category: string
  }>
}

export default function CategoryPage({ params }: PagePramas) {
  const { category } = React.use(params)
  const c = category.replace("-", " ").split("")
  const filterC = `${c[0].toUpperCase()}${c.splice(1).join("")}`
  const [meals, setMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if(!filterC) return;
    setLoading(true)
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${filterC}`)
      .then(res => res.json())
      .then(data => setMeals(data.meals))
    setLoading(false)
  }, [filterC])

  if(loading) return <div className='pt-18'><ForYouLoading /></div>
  return (
    <div className='flex flex-col gap-2 pt-18'>
      <h1 className="text-center text-2xl font-semibold">{filterC}</h1>
      <div className='flex flex-wrap gap-4 p-8 justify-center max-[500px]:p-2'>
        {meals.map((m) => (
          <Meal
            key={`${m.idMeal}-${m.strCategory}`}
            title={m.strMeal}
            thumb={m.strMealThumb}
            category={filterC}
            code={m.idMeal}
            redirect={(url: string) => router.push(url)}
          />
        ))}
      </div>
    </div>
  )
}
