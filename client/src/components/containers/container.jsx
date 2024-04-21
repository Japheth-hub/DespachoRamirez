import React, { useEffect, useState } from 'react'
import '@/app/globals.css'

export default function Container({info, type, callback}) {

  // console.log('esta es la data' , info)

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
            <span className='font-bold text-red-700 text-xl close' id={item} onClick={(e) => { callback(e, type) }}>X</span>
          </div>
        )
      })
      : <span>Aun no hay datos</span>
    }
    </div>
  )
}
