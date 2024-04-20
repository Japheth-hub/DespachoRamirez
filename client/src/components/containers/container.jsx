import React, { useEffect, useState } from 'react'

export default function Container({info, type, callback}) {

  // console.log('esta es la data' , info)

  const [data, setData] = useState([])

  useEffect(()=>{
    setData(info)
  }, [info])

  return (
    <div>
      <h4>{type}</h4>
      {data && data.length > 0
      ? data.map((item, index) => <div key={index}><span>{item}</span><span id={item} onClick={(e)=>{callback(e, type)}}>x</span></div>)
      : <span>Aun no hay datos</span>
    }
    </div>
  )
}
