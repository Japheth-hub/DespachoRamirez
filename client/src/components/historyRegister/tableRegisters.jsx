'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import style from './tableRegisters.module.css'
import '@/app/globals.css'
const URL = process.env.URL_BACK

export default function TableRegisters({update}) {

  const [info, setInfo] = useState([])

  useEffect(() => {
    async function saveData() {
      try {
        const { data } = await axios(`http://localhost:3001/record`)
        setInfo(data)
      } catch (error) {
        console.log(error)
      }
    }
    saveData()
  }, [update])

  return (
    <div className='my-3 mx-auto'>
      <table className={`mx-auto w-11/12 ${style.table}`}>
        <thead>
          <tr className={style.trh}>
            <th>User</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Notifications</th>
            <th>Categories</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {info && info.length > 0
          ? info.map((item, i) => {
            return item.users.map((user, index) => {
              let bg = i % 2 === 0 ? 'white' : '#bbb' 
              return (
                <tr className={style.trd} key={index} style={{backgroundColor:bg}} >
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.channel.join(' / ')}</td>
                  <td>{item.categories.join(' / ')}</td>
                  <td>{item.message}</td>
                </tr>
              )
            })
          })
          : <tr><td colSpan={6} className='text-4xl text-center font-bold py-3'>No hay datos por mostrar</td></tr>
        }
        </tbody>
      </table>
    </div>
  )
}
