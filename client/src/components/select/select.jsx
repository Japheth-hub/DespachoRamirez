import React from 'react'
import '@/app/globals.css'

export default function Select({data, type, callback}) {
  return (
    <select className='select' name={type} defaultValue='default' onChange={callback}>
            <option value="default" disabled>Select {type}</option>
            {type === 'User' && <option value="all">Select All</option>}
            {data && data.length > 0 
              ? data.map((item) => {
                return <option key={item.id} value={item.id}>{item.name}</option>
              })
              : <option value={false}>No hay datos</option>
            }
          </select>
  )
}
