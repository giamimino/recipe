import React from 'react'
import Image from 'next/image'

function Category(props: CategoryComProps) {
  return (
      <div
        className={`flex flex-col gap-2.5 items-center justify-center border-1
        p-2 rounded-md select-none w-50 max-[500px]:w-35 ${props.isSelected ? "border-amber-500" : "border-black"}`}
        >
        <Image
          src={`${props.thumb}`}
          alt={props.title}
          width={150}
          height={150}
          className='rounded-xl object-cover'
          priority
          />
        <h1 
          onClick={() => props.onSelect(props.title.toLowerCase())}
          className='cursor-pointer hover:text-amber-500 text-center truncate w-full'>
          {props.title}</h1>
      </div>
  )
}

export default React.memo(Category)