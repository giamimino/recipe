"use client"
import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import ForYouLoading from '@/components/ui/loading/ForYouLoading'
import Search from '@/components/ui/search'
import { useDebounce } from '@/hooks/useDebounce'
import { useRouter, useSearchParams } from 'next/navigation'
import Meal from '@/components/ui/meal'

export default function All() {
  const [meals, setMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [visibleCount, setVisibleCount] = useState(29)
  const [searchValue, setSearchValue] = useState("")
  const debouncedSearch = useDebounce(searchValue)
  const paramSearch = useSearchParams()
  const router = useRouter()
  
  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
      const allMeals:Meal[] = [];
      
      await Promise.all(
        letters.map(async (l) => {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${l}`);
          const data = await response.json();
          if (data.meals) {
            allMeals.push(...data.meals);
          }
        })
      );
  
      setMeals(allMeals)
      setLoading(false)
    }
    fetchData()
  }, [])

  function throttle<T extends (...args: any[]) => void>(fn: T, wait: number) {
    let last = 0;
    return (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - last >= wait) {
        fn(...args);
        last = now;
      }
    };
  }


  useEffect(() => {
    function handleWindowScroll() {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - (visibleCount * 10)) {
        setVisibleCount((prev) => prev + 7);
      }
    }

    const throttled = throttle(() => handleWindowScroll(), 350);
    window.addEventListener("scroll", throttled);

    return () => window.removeEventListener("scroll", throttled);
  }, []);

  const filteredMeals: Meal[] = useMemo(() => {
    const sv = paramSearch.get("s")
    if(sv) {
      return meals.filter((m) => m.strMeal.toLowerCase().includes(sv.toLowerCase()))
    }
    if(debouncedSearch.trim() !== "") {
      return meals.filter((m) => m.strMeal.toLowerCase().includes(debouncedSearch.toLowerCase()))
    }

    return meals
  }, [meals, debouncedSearch])

  if(loading) return <ForYouLoading />
  return (
    <div className='flex flex-col gap-16 pt-[10vh]'>
      <div className='flex flex-col items-center gap-3'>
        <h1 className='text-center text-2xl font-semibold'>Search for an Recipe</h1>
        <Search
          onChange={(value: string) => setSearchValue(value)}
          value={searchValue}
          requestSearch={(value: string) => setSearchValue(value)}
        />
      </div>
      <div className='flex flex-col'>
        <h1 className="text-center text-2xl font-semibold">All Recipie</h1>
        <div className='flex flex-wrap gap-4 p-8 justify-center max-[500px]:p-2'>
          {filteredMeals.slice(1, visibleCount).map((meal, index) => (
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
      </div>
    </div>
  )
}
