import React, { useEffect, useState } from 'react'

export default function Container({info, type}) {

  const [data, setData] = useState([])

  console.log('Aqui esta la data que va cambiando', data)

  useEffect(()=>{
    setData(info)
  }, [info])

  return (
    <div>
      <p>{type}</p>
      {data && data.length > 0
      ? data.map((item, index) => <p key={index}>{item} - <span>x</span></p>)
      : <span>Aun no hay datos</span>
    }
    </div>
  )
}
