'use client'
import React from 'react';
import axios from 'axios'
import { useState, useEffect } from "react";
import Select from '../select/select';
import Container from '../containers/container';
const URL = process.env.URL_BACK;

export default function FormNotification() {
  
  // console.log('aqui esta la url', URL)
  const [body, setBody] = useState([])
  const [listUsers, setListUsers] = useState([]);
  const [listNotif, setListNotif] = useState([]);
  const [listCategory, setListCategory] = useState([])
  const [userContainer, setUserContainer] = useState([])
  const [notificationContainer, setNotificationContainer] = useState([])
  const [categoryContainer, setCategoryContainer] = useState([])
  const [all, setAll] = useState(false)

  function handleUsers(e){
    const user = e.target.value
    if(user === 'all'){
      setAll(true)
      setUserContainer([])
      console.log(body.map((item) => item.name))
      setUserContainer(body.map((item) => item.name))
    } else {
      if(!all){
        const [add] = body.filter((item) => item.id.toString() === user)
        setUserContainer([...userContainer, add.name])
      } else {
        alert("No puedes agregar mas usuarios")
      }
    }
  }

  
  useEffect(()=>{
    async function getData() {
      try {
        const { data } = await axios(`http://localhost:3001/users`);
        setBody(data)
        // const { data } = await axios(`${URL}users`);
        const clearState = data.map((item) => {
          return {
            id: item.id,
            name: item.name,
          };
        });
        const notifications = await axios(`http://localhost:3001/notifications`);
        const categories = await axios(`http://localhost:3001/categories`);
        setListNotif(notifications.data)
        setListCategory(categories.data);
        setListUsers(clearState)
      } catch (error) {}
    }
    getData()
  }, [])

  return (
    <div className="flex flex-col justify-center items-center bg-purple-500 w-4/6">
      <h3>Send Notification</h3>
      <form className="flex flex-col justify-center items-center w-full">
        <div className="flex justify-between w-full">
          <Select data={listUsers} type={"User"} callback={handleUsers} />
          <Select data={listNotif} type={"Notificaton"} />
          <Select data={listCategory} type={"Category"} />
        </div>

        <div className="w-full flex justify-between">
          <Container info={userContainer} type={'User'}/>
          {/* <Container />
          <Container /> */}
        </div>

        <textarea name="" id="" cols="50" rows="5"></textarea>
        <button>Send</button>
      </form>
    </div>
  );
}
