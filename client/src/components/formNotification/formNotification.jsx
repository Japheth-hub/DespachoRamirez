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
  const [listCategory, setListCategory] = useState([])
  const [userContainer, setUserContainer] = useState([])
  const [categoryContainer, setCategoryContainer] = useState([])
  const [text, setText] = useState("")

  function handleCategory(e){
    const category = e.target.value
    const [add] = listCategory.filter((item) => item.id === parseInt(category));
    !categoryContainer.includes(add.name) && setCategoryContainer([add.name]);
    const users = body.filter((user) => user.categories.some((item) => item.id === parseInt(category)))
    setUserContainer(users.map((user) => user.name))
  }

  function handleTextarea(e){
    setText(e.target.value)
  }

  async function handleSubmit(e){
    e.preventDefault()
    const arrayUsersId = []
    for(let user of userContainer){
      const element = body.filter((item) => item.name === user)[0]
      arrayUsersId.push(element)
    }
    const reqBody = {
      users: arrayUsersId.map((item) => item.id),
      categories : categoryContainer,
      message : text
    } 
    if(categoryContainer.length === 0){
      alert('Seleccione una categoria')
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
        const categories = await axios(`http://localhost:3001/categories`);
        setListCategory(categories.data);
      } catch (error) {}
    }
    getData()
  }, [])

  return (
    <div className={style.formNotification}>
      <h3 className={style.h3}>Send Notification</h3>
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={`grid grid-cols-1 ${style.divGrid}`}>
          <Select data={listCategory} type={"Category"} callback={handleCategory}/>
        </div>
        <div className={`grid grid-cols-1 ${style.divGrid}`}>
          <Container info={userContainer} type={"User"}/>
        </div>
        <textarea className={style.textarea} placeholder='Escribe tu mensaje aqui...' cols="50" rows="5" onChange={handleTextarea} value={text}></textarea>
        <button className={`py-1 px-4 m-3 font-bold ${style.btn}`}>Send</button>
      </form>
    </div>
  );
}