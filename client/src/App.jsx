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
import Topbar from './components/Topbar';
import Footer from './components/Footer';
import { useFetch } from './hook/useFetch';
import SignupForm from './pages/Signup';
import SignInForm from './pages/Signin';
import AuthProvider from './contexts/AuthProvider';
import Dashboard from './pages/Dashboard';
import Protected from './pages/Protected';


export const CartContext = createContext()

export default function App() {
  // ✅ Initialize cart from localStorage on first render

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });


  const {data:categories, error, loading} = useFetch('http://localhost:7000/categories');

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);



  return (
    <AuthProvider>
      <CartContext.Provider value={{ cart, setCart }}>
        <BrowserRouter>
          <Topbar/>
          <Navbar categories={categories}/>
          <Routes>
            <Route path="/" element={<Home categories={categories} />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/:slug" element={<DetailPage />} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/signup" element={<SignupForm/>} />
            <Route path="/signin" element={<SignInForm/>} />
            <Route path="/dashboard" element={<Protected><Dashboard/></Protected>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Footer/>
      </CartContext.Provider>
    </AuthProvider>
  );
}