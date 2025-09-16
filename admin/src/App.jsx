
import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AddCategoryForm from './pages/AddCategoryForm';
import AddProductForm from './pages/AddProductForm';
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from "react-router";
import Orders from './pages/Orders';
import { io } from "socket.io-client";
import { useEffect } from 'react';

const socket = io("http://localhost:7000");

function App() {

  useEffect(()=>{
    socket.on('abc', (data)=>{
      console.log(data.message);
    })
    socket.on('abcf', (data)=>{
      console.log(data.message);
    })
  },[])


  const sendMessage = ()=>{
    socket.emit('chat', {chat:'Hello from the client'})
  }

  return (
    <div class="container-fluid position-relative d-flex p-0">
      <BrowserRouter>
      <Sidebar/>
      

      <div class="content">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/add-product" element={<AddProductForm/>} />
          <Route path="/add-category" element={<AddCategoryForm/>} />
          <Route path="/orders" element={<Orders/>} />
        </Routes>
      </div>
      </BrowserRouter>
      <button onClick={sendMessage}>Send message</button>
    </div>
  )
}

export default App
