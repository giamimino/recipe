'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import ForYouLoading from '../ui/loading/ForYouLoading';

export default function ForYou() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
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
        <div
          key={`${meal.idMeal}-${index}`}
          className={`flex flex-col gap-2.5 items-center justify-center border-1 border-black
          p-2 rounded-md select-none w-50 max-[500px]:w-35`}
        >
          <Image
            src={`${meal.strMealThumb}/small`}
            alt={meal.strMeal}
            width={150}
            height={300}
            className='rounded-xl object-cover'
            priority
          />
          <h1 className='cursor-pointer hover:text-amber-500 text-center truncate w-full'>{meal.strMeal}</h1>
        </div>
      ))}
    </div>
  )
}
