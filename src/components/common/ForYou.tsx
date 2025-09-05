'use client'
import React, { useEffect, useState } from 'react'
import ForYouLoading from '../ui/loading/ForYouLoading';
import { useRouter } from 'next/navigation';
import Meal from '../ui/meal';

export default function ForYou() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter()
  let length = 21
  if(window.innerWidth <= 768) {
    length = 12
  }
  useEffect(() => {
      setLoading(true);
      const fetchData = async () => {
        const requests = Array.from({ length }, () =>
          fetch('https://www.themealdb.com/api/json/v1/1/random.php')
            .then(res => res.json())
            .then(data => data.meals[0])
        );
 
       const results = await Promise.all(requests);
       setMeals(results)
       setLoading(false);
      }
      fetchData();
  }, []);

  if (loading) return <ForYouLoading />;
  return (
    <div className='flex flex-wrap gap-4 p-8 justify-center max-[500px]:p-2'>
      {meals.map((meal, index) => (
        <Meal
          key={`${meal.strMeal}-${index}`}
          thumb={meal.strMealThumb}
          title={meal.strMeal}
          code={meal.idMeal}
          category={meal.strCategory}
          redirect={(url: string) => router.push(url)}
        />
      ))}
    </div>
  )
}
