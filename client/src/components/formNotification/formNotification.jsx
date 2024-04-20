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
  const [text, setText] = useState("")

  function handleUsers(e){
    const user = e.target.value;
    if(user === 'all'){
      setUserContainer([])
      setNotificationContainer([]);
      setCategoryContainer([]);
      setUserContainer(body.map((item) => item.name))
    } else {
      setUserContainer([]);
      const [add] = body.filter((item) => item.id.toString() === user);
      setUserContainer([add.name]);
      const arrayCategories = add.categories.map((item) => item.name);
      const arrayNotifications = add.notifications.map((item) => item.name);
      setNotificationContainer(arrayNotifications);
      setCategoryContainer(arrayCategories);
    }
  }

  function handleNotifications(e){
    const type = e.target.value
    const [add] = listNotif.filter((item) => item.id === parseInt(type))
    !notificationContainer.includes(add.name) && setNotificationContainer([...notificationContainer, add.name]);
  }
  
  function handleCategory(e){
    const category = e.target.value
    const [add] = listCategory.filter((item) => item.id === parseInt(category));
    !categoryContainer.includes(add.name) && setCategoryContainer([...categoryContainer, add.name]);
  }

  function handleDelete(e, type){
    const id = e.target.id
    type === 'User' && setUserContainer(userContainer.filter((item) => item !== id))
    type === 'Notification' && setNotificationContainer(notificationContainer.filter((item) => item !== id))
    type === 'Category' && setCategoryContainer(categoryContainer.filter((item) => item !== id))
  }

  function handleTextarea(e){
    setText(e.target.value)
  }

  function handleSubmit(e){
    e.preventDefault()
    let users = []
    if(userContainer.length === 1){
      users = body.filter((item) => item.name === userContainer[0])
    } else {
      const allUsers = []
      for(let user of userContainer){
        allUsers.push(body.filter((item) => item.name === user)[0])
      }
      users = allUsers
    }
    console.log(users)
    console.log(notificationContainer)
    console.log(categoryContainer)
    console.log(text)
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
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-full">
        <div className="flex justify-between w-full">
          <Select data={listUsers} type={"User"} callback={handleUsers} />
          <Select data={listNotif} type={"Notificaton"} callback={handleNotifications}/>
          <Select data={listCategory} type={"Category"} callback={handleCategory}/>
        </div>
        <div className="w-full flex justify-between">
          <Container info={userContainer} type={"User"} callback={handleDelete}/>
          <Container info={notificationContainer} type={"Notification"} callback={handleDelete}/>
          <Container info={categoryContainer} type={'Category'} callback={handleDelete}/>
        </div>
        <textarea placeholder='Escribe tu mensaje aqui...' cols="50" rows="5" onChange={handleTextarea} value={text}></textarea>
        <button>Send</button>
      </form>
    </div>
  );
}