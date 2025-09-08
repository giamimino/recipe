"use client"
import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import ForYouLoading from '@/components/ui/loading/ForYouLoading'
import Search from '@/components/ui/search'
import { useDebounce } from '@/hooks/useDebounce'
import { useRouter, useSearchParams } from 'next/navigation'
import Meal from '@/components/ui/meal'
import Category from '@/components/ui/category'

export default function All() {
  const [meals, setMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(21)
  const [searchValue, setSearchValue] = useState("")
  const [filter, setFilter] = useState<string[]>([])
  const [category, setCategory] = useState<MealCategory[]>([])
  const debouncedSearch = useDebounce(searchValue)
  const paramSearch = useSearchParams()
  const router = useRouter()
  const categoryFilterRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const fetchData = async () => {
      const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
      const allMeals: Meal[] = [];

      for (const l of letters) {
        if (allMeals.length >= visibleCount) break;
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${l}`);
        const data = await response.json();
        if (data.meals) {
          allMeals.push(...data.meals);
        }
      }

      setMeals(allMeals.slice(0, visibleCount));
      setLoading(false);
    };
    fetchData();
  }, [visibleCount]);

  const getCategories = async () => {
    try {
      const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      const data = await res.json()
      if (data.categories) {
        setCategory(data.categories)
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          getCategories()
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.3 }
    )

    if (categoryFilterRef.current) {
      observer.observe(categoryFilterRef.current)
    }

    return () => {
      if (categoryFilterRef.current) {
        observer.unobserve(categoryFilterRef.current)
      }
    }
  }, [])


  const filteredMeals: Meal[] = useMemo(() => {
    let result = meals ?? []
    const sv = paramSearch.get("s")
    if(filter.length >= 1 && meals.length >= 1) {
      result = result.filter(
        (m) => filter.includes(m.strCategory.toLowerCase())
      )
    }
    if(sv) {
      result = result.filter((m) => m.strMeal.toLowerCase().includes(sv.toLowerCase()))
    }
    if(debouncedSearch.trim() !== "") {
      result = result.filter((m) => m.strMeal.toLowerCase().includes(debouncedSearch.toLowerCase()))
    }

    return result
  }, [meals, debouncedSearch, filter])

  function handleSearch(value: string) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value.replace(" ", "+")}`)
      .then(res => res.json())
      .then(data => {
        if(data.meals) {
          setMeals(prev => prev ? [
            ...prev,
            ...data.meals
          ] : data.meals)
        }
      })
  }

  return (
    <div className='flex flex-col gap-16 pt-[10vh] pb-[5vh]'>
      <div className='flex flex-col items-center gap-3'>
        <h1 className='text-center text-2xl font-semibold'>Search for an Recipe</h1>
        <Search
          onChange={(value: string) => setSearchValue(value)}
          value={searchValue}
          requestSearch={handleSearch}
        />
      </div>
      {loading ?
        <ForYouLoading /> : (
          <div className='flex flex-col'>
              <h1 className="text-center text-2xl font-semibold">All Recipie</h1>
            <div className='flex flex-wrap gap-4 p-8 justify-center max-[500px]:p-2'>
              {filteredMeals.map((meal, index) => (
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
            <div className='flex gap-2 justify-center'>
              <button 
                onClick={() => setVisibleCount(prev => prev + 7)}
                className='text-center text-black/90 text-base font-medium underline cursor-pointer
                transition-all duration-200
                hover:text-black'>show More
              </button>
              {visibleCount > 21 && (
                <>
                  <button 
                    onClick={() => setVisibleCount(21)}
                    className='text-center text-black/70 text-base font-medium underline cursor-pointer
                    transition-all duration-200
                    hover:text-black'>show less
                  </button>
                  <button 
                  onClick={() => {setVisibleCount(304); setLoading(true)}}
                  className='text-center text-black/90 text-base font-medium underline cursor-pointer
                  transition-all duration-200
                  hover:text-black'>show all
                </button>
                </>
              )}
            </div>
          </div>
        )
      }
      <div ref={categoryFilterRef} className='mt-12 flex flex-col
      gap-4'>
        <h1 className="text-center text-2xl font-semibold">Filter By Category</h1>
        <div className='flex flex-wrap gap-4 p-8 justify-center max-[500px]:p-2'>
          {category.length > 0 && (
            <Suspense fallback={<ForYouLoading />}>
              {category.map((c) => (
                <Category
                  key={c.strCategory}
                  thumb={c.strCategoryThumb}
                  title={c.strCategory}
                  isSelected={filter.find(
                    (f) => f.toLowerCase() === c.strCategory.toLowerCase()
                  ) ? true : false}
                  onSelect={(value: string) => setFilter(
                    prev => prev.find((p) => p === value) ?
                    prev.filter(
                      (p) => p !== value
                    ) : [
                      ...prev,
                      value 
                    ]
                  )}
                />
              ))}
            </Suspense>
          )}
        </div>
      </div>
    </div>
  )
}
