import { Icon } from '@iconify/react'
import React from 'react'


export default function Search(props: SearchProps) {
  return (
    <div className='max-w-50 h-fit relative'>
      <input type="text" className='w-full h-full border-1 border-black rounded-md p-2' value={props.value} onChange={(e) => props.onChange(e.target.value)} />
      <Icon icon={'lets-icons:search'} className='absolute right-2 top-1/2 translate-y-[-50%] p-0.5 
      bg-black text-white text-xl cursor-pointer rounded-md hover:bg-black/90' />
    </div>
  )
}
