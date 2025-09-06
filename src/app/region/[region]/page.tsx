"use client"
import ForYouLoading from '@/components/ui/loading/ForYouLoading'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
const Meal = dynamic(() => import('@/components/ui/meal'), {
  ssr: false
})

type PageProps = {
  params: Promise<{
    region: string
  }>
}

export default function RegionPage({ params }: PageProps) {
  const { region } = React.use(params)
  const [meals, setMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    setLoading(true)
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${region}`)
      .then(res => res.json())
      .then(data => setMeals(data.meals))
    setLoading(false)
  }, [])

  if(loading) return <div className='pt-18'><ForYouLoading /></div>
  return (
    <div className='flex flex-col gap-2 pt-18'>
      <h1 className="text-center text-2xl font-semibold">{region}</h1>
      <div className='flex flex-wrap gap-4 p-8 justify-center max-[500px]:p-2'>
        {meals.map((m) => (
          <Meal
            key={`${m.idMeal}-${m.strCategory}`}
            title={m.strMeal}
            thumb={m.strMealThumb}
            category={m.strCategory}
            code={m.idMeal}
            redirect={(url: string) => router.push(url)}
          />
        ))}
      </div>
    </div>
  )
}
