import React, { useEffect, useState } from 'react'

export default function ForYouLoading() {
  const [length, setLength] = useState(14)
  useEffect(() => {
    if(window.innerWidth <= 768) {
      setLength(7)
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
