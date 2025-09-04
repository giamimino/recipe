import React, { useEffect } from 'react'

export default function ForYouLoading() {
  let length = 14
  useEffect(() => {
    if(window.innerWidth <= 768) {
      length = 8
    }
  }, [])
  const placeholder = Array.from({ length })
  return (
    <div className='flex flex-wrap gap-4 p-8 justify-center'>
      {placeholder.map((_,index) => (
        <div
        key={index}
          className='flex flex-col items-center justify-center
          p-2 w-50 max-[500px]:w-35'
        >
          <div className='w-46 h-46 bg-gray-400 max-[500px]:w-35 mx-[500px]:h-35 animate-pulse'></div>
          <div className='bg-gray-400 animate-pulse w-[100px] h-[20px] mt-2.5'></div>
        </div>
      ))}
    </div>
  )
}
