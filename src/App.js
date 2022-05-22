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
import NotFound from "./components/Shared/NotFound/NotFound";
import Contact from "./components/pages/Contact/Contact";
import Orders from "./components/pages/Dashboard/Orders";
import AddReview from "./components/pages/Dashboard/AddReview";
import Profile from "./components/pages/Dashboard/Profile";
import IndexDashboard from "./components/pages/Dashboard/IndexDashboard";
function App() {
  return (
    <Navbar>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/purchase' element={<RequireAuth><Perchase/></RequireAuth>} />
            <Route path='/dashboard' element={<RequireAuth><Dashboard/></RequireAuth>} >
                <Route index element={<IndexDashboard/>}/>
                <Route path='orders' element={ <Orders/>}/>
                <Route path='review' element={ <AddReview/>}/>
                <Route path='profile' element={ <Profile/>}/>
            </Route>
            <Route path='register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/blogs' element={<Blogs/>} />
            <Route path='/contact' element={<Contact/>} />
            <Route path='/about-me' element={<MyPortfolio/>} />
            <Route path='*' element={<NotFound/>}/>
            <Route path='reset-password' element={<ForgotPassword/>}/>
        </Routes>
    </Navbar>
  );
} 

export default App;
