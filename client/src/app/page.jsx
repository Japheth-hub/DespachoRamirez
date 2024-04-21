'use client'
import FormNotification from "@/components/formNotification/formNotification"
import TableRegisters from "@/components/historyRegister/tableRegisters"
import { useState } from "react"
import "./globals.css";


export default function App() {

  const [update, setUpdate] = useState(true)

  function handleUpdate() {
    setUpdate(!update)
  }

  return (
    <div>
      <div className='divFormNotifications'>
        <FormNotification callback={handleUpdate} />
      </div>
      <div className='divTableRegisters'>
        <TableRegisters update={update} />
      </div>
    </div>
  )
}
