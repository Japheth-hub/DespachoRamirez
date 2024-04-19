import React from 'react'

export default function FormNotification() {
  return (
    <div className='flex flex-col justify-center items-center'>
        <h3>Send Notification</h3>
        <form className='flex flex-col justify-center items-center'>
            <div className='flex justify-between w-4/5'>
                <select name="Users" id="">
                    <option value="">Select User</option>
                </select>
                <select name="Notifications" id="">
                    <option value="">Select Notificaton</option>
                </select>
            </div>
            <div>
                <p>Chnnels</p>
                <span>Aqwui van los canales</span>
            </div>
            <textarea name="" id="" cols="50" rows="5"></textarea>
            <button>Send</button>
        </form>
    </div>
  )
}
