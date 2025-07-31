import './App.css'
import About from './pages/About';
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from "react-router";
import Cart from './pages/Cart';
import Login from './pages/Login';
import NotFound from './components/NotFound';
import DetailPage from './pages/DetailPage';
import { createContext } from 'react';
import { useState, useEffect } from 'react';
import Contact from './pages/Contact';
import Topbar from './components/TopBar';
import Footer from './components/Footer';


export const CartContext = createContext()

export default function App() {
  // ✅ Initialize cart from localStorage on first render

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });



  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      
      <BrowserRouter>
        <Topbar/>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products/:slug" element={<DetailPage />} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </CartContext.Provider>
  );
}