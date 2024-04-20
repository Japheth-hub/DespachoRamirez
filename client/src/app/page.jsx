'use client'
import FormNotification from "@/components/formNotification/formNotification"
import TableRegisters from "@/components/historyRegister/tableRegisters"
import { useState } from "react"

export default function App() {

  const [update, setUpdate] = useState(true)

  function handleUpdate(){
    setUpdate(!update)
  }

  return (
    <div>
        <div className='bg-sky-600 flex justify-center item'>
            <FormNotification callback={handleUpdate}/>
        </div>
        <div className="bg-red-600">
            <TableRegisters update={update}/>
        </div>
    </div>
  )
}
