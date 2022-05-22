import Navbar from "./components/Header/Navbar";
import {Routes, Route } from 'react-router-dom'
import Home from "./components/pages/Home/Home";
import Perchase from "./components/pages/Perchase/Perchase";
import Register from "./authentication/Register/Register";
import Login from "./authentication/Login/Login";
import Blogs from "./components/pages/Blogs/Blogs";
import MyPortfolio from "./components/pages/MyPortfolio/MyPortfolio";
import ForgotPassword from "./authentication/FogetPassword/ForgotPassword";
import RequireAuth from "./authentication/RequireAuth/RequireAuth";
import Dashboard from "./components/pages/Dashboard/Dashboard";
function App() {
  return (
    <Navbar>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/perchase' element={<RequireAuth><Perchase/></RequireAuth>} />
            <Route path='/dashboard' element={<RequireAuth><Dashboard/></RequireAuth>} />
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
