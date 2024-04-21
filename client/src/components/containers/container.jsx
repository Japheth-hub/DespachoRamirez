import React, { useEffect, useState } from 'react'
import '@/app/globals.css'

export default function Container({info, type}) {

  const [data, setData] = useState([])

  useEffect(()=>{
    setData(info)
  }, [info])

  return (
    <div className='flex flex-col justify-start items-center'>
      <h4 className='mx-auto font-semibold text-2xl'>{type}</h4>
      {data && data.length > 0
      ? data.map((item, index) => {
        return (
          <div key={index} className='bg-white rounded-md w-4/5 flex justify-around'>
            <span>{item}</span>
          </div>
        )
      })
      : <span>Aun no hay datos</span>
    }
    </div>
  )
}
