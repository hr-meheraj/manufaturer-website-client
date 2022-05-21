import Navbar from "./components/Header/Navbar";
import {Routes, Route } from 'react-router-dom'
import Home from "./components/pages/Home/Home";
import Perchase from "./components/pages/Perchase/Perchase";
import Register from "./authentication/Register/Register";
import Login from "./authentication/Login/Login";
import Blogs from "./components/pages/Blogs/Blogs";
import MyPortfolio from "./components/pages/MyPortfolio/MyPortfolio";
import ForgotPassword from "./authentication/FogetPassword/ForgotPassword";
function App() {
  return (
    <Navbar>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/perchase' element={<Perchase/>} />
            <Route path='register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/blogs' element={<Blogs/>} />
            <Route path='/about-me' element={<MyPortfolio/>} />
            <Route path='reset-password' element={<ForgotPassword/>}/>
        </Routes>
    </Navbar>
  );
}

export default App;
