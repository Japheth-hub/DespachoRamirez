'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
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
    <div>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>email</th>
            <th>phone</th>
            <th>Notifications</th>
            <th>Categories</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {info && info.length > 0
          ? info.map((item, i) => {
            return item.users.map((user, index) => {
              let color = i % 2 === 0 ? 'red' : 'orange' 
              return (
                <tr key={index} style={{backgroundColor:color}} >
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{item.notifications.join(' / ')}</td>
                  <td>{item.categories.join(' / ')}</td>
                  <td>{item.message}</td>
                </tr>
              )
            })
          })
          : <tr><td colSpan={6}>No hay datos por mostrar</td></tr>
        }
        </tbody>
      </table>
    </div>
  )
}
