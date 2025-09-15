"use client"
import React, { useEffect, useRef, useState } from 'react'
import Category from '../ui/category';
import { useRouter } from 'next/navigation';

export default function HomeCategory() {
  const [category, setCategory] = useState<MealCategory[]>([])
  const categortRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const fetchData = async () => {
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
      ([enter]) => {
        if(enter.isIntersecting) {
          fetchData()
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if(categortRef.current) {
      observer.observe(categortRef.current)
    }

    return () => {
        observer.disconnect()
    }
  }, [])
  return (
    <div ref={categortRef}
    className='flex flex-wrap gap-4 p-8 justify-center max-[500px]:p-2'>
      {category.map((c) => (
        <Category
          key={c.strCategory}
          title={c.strCategory}
          thumb={c.strCategoryThumb}
          onSelect={(value: string) => router.push(`/meal/${value.replace(" ", "-").toLowerCase()}`)}
          isSelected={false}
        />
      ))}
    </div>
  )
}
