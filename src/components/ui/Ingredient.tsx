import React from 'react'
import Image from 'next/image'

type IngredientProps = {
  ingredient: string,
  measure: string,
}

function Ingredient(props: IngredientProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center border-1 border-black
      p-2 rounded-md select-none w-50 max-[500px]:w-35`}
    >
      <Image
        src={`https://www.themealdb.com/images/ingredients/${props.ingredient}-small.png`}
        alt={props.ingredient}
        width={150}
        height={150}
        className='rounded-xl object-cover'
        priority
      />
      <h1 
      className='cursor-pointer hover:text-amber-500 text-center truncate w-full mt-2.5'>
        {props.ingredient}</h1>
        <p className='text-sm text-black/90'>{props.measure}</p>
    </div>
  )
}

export default React.memo(Ingredient);