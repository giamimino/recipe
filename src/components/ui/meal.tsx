import React from 'react'
import Image from 'next/image'

function Meal(props: MealComProps) {
  return (
      <div
        className={`flex flex-col gap-2.5 items-center justify-center border-1 border-black
        p-2 rounded-md select-none w-50 max-[500px]:w-35`}
      >
        <Image
          src={`${props.thumb}/small`}
          alt={props.title}
          width={150}
          height={150}
          className='rounded-xl object-cover'
        />
        <h1 
        onClick={() => props.redirect(`/meal/${props.category.toLowerCase()}/${props.code}-${props.title}`)} 
        className='cursor-pointer hover:text-amber-500 text-center truncate w-full'>
          {props.title}</h1>
      </div>
  )
}

export default React.memo(Meal)