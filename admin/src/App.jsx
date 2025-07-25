
import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AddCategoryForm from './pages/AddCategoryForm';
import AddProductForm from './pages/AddProductForm';
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from "react-router";

function App() {

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
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  )
}

export default App
