'use client'
import React from 'react';
import axios from 'axios'
import { useState, useEffect } from "react";
import Select from '../select/select';
import Container from '../containers/container';
import style from './formNotification.module.css'
const URL = process.env.URL_BACK;

export default function FormNotification({callback}) {
  
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

  async function handleSubmit(e){
    e.preventDefault()
    const arrayUsersId = []
    for(let user of userContainer){
      const element = listUsers.filter((item) => item.name === user)[0]
      arrayUsersId.push(element)
    }
    const reqBody = {
      users: arrayUsersId.map((item) => item.id),
      notifications : notificationContainer,
      categories : categoryContainer,
      message : text
    }  
    if(userContainer.length === 0){
      alert('Selecciona el/los usuario(s) para enviar la notificacion')
      return
    }  
    if(notificationContainer.length === 0){
      alert('Selecciona una Notificacion')
      return
    }
    if(categoryContainer.length === 0){
      alert('Selecciona una Categoria')
      return
    }
    if(text.length === 0){
      alert('No hay mensaje para enviar')
      return
    }
    try {
      const { data } = await axios.post(`http://localhost:3001`, reqBody)
      alert(data.message)
      callback()
      setNotificationContainer([])
      setCategoryContainer([])
      setUserContainer([])
      setText("")
    } catch (error) {
      console.log(error)
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
    <div className={style.formNotification}>
      <h3 className={style.h3}>Send Notification</h3>
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={`grid grid-cols-3 ${style.divGrid}`}>
          <Select data={listUsers} type={"User"} callback={handleUsers} />
          <Select data={listNotif} type={"Notificaton"} callback={handleNotifications}/>
          <Select data={listCategory} type={"Category"} callback={handleCategory}/>
        </div>
        <div className={`grid grid-cols-3 ${style.divGrid}`}>
          <Container info={userContainer} type={"User"} callback={handleDelete}/>
          <Container info={notificationContainer} type={"Notification"} callback={handleDelete}/>
          <Container info={categoryContainer} type={'Category'} callback={handleDelete}/>
        </div>
        <textarea className={style.textarea} placeholder='Escribe tu mensaje aqui...' cols="50" rows="5" onChange={handleTextarea} value={text}></textarea>
        <button className={`py-1 px-4 m-3 font-bold ${style.btn}`}>Send</button>
      </form>
    </div>
  );
}