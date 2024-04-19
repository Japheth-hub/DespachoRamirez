import FormNotification from "@/components/formNotification/formNotification"
import TableRegisters from "@/components/historyRegister/tableRegisters"

export default function App() {
  return (
    <div>
        <div className='bg-sky-600 flex justify-center item'>
            <FormNotification/>
        </div>
        <div className="bg-red-600">
            <TableRegisters/>
        </div>
    </div>
  )
}
