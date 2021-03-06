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
// import Contact from "./components/pages/Contact/Contact";
import Orders from "./components/pages/Dashboard/Orders";
import AddReview from "./components/pages/Dashboard/AddReview";
import Profile from "./components/pages/Dashboard/Profile";
import IndexDashboard from "./components/pages/Dashboard/IndexDashboard";
import Blog from "./components/pages/Blogs/Blog";
import ManageUsers from "./components/pages/Dashboard/ManageUsers";
import RequireAdmin from "./authentication/RequireAdmin/RequireAdmin";
import AddProducts from "./components/pages/Dashboard/AddProducts";
import ManageProducts from "./components/pages/Dashboard/ManageProducts";
import Reviews from "./components/pages/Reviews/Reviews";
import DynamicPurchasePage from "./components/pages/Perchase/DynamicPurchasePage";
import Payment from "./components/pages/Dashboard/Payment";
import ManageOrders from "./components/pages/Dashboard/ManageOrders";
function App() {
  return (
    <Navbar>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/purchase' element={<RequireAuth><Perchase/></RequireAuth>} />
            <Route path='/purchase/:id' element={<RequireAuth><DynamicPurchasePage/></RequireAuth>} />
            <Route path='/dashboard' element={<RequireAuth><Dashboard/></RequireAuth>} >
                <Route index element={<IndexDashboard/>}/>
                <Route path='orders' element={ <Orders/>}/>
                <Route path='orders/payment/:id' element={ <Payment/>}/>
                <Route path='review' element={ <AddReview/>}/>
                <Route path='profile' element={ <Profile/>}/>
                <Route path='manage-users' element={ <RequireAdmin><ManageUsers/></RequireAdmin>}/>
                <Route path='manage-orders' element={ <RequireAdmin><ManageOrders/></RequireAdmin>}/>
                <Route path='add-product' element={ <RequireAdmin><AddProducts/></RequireAdmin>}/>
                <Route path='manage-products' element={ <RequireAdmin><ManageProducts/></RequireAdmin>}/>
            </Route>
            <Route path='register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/reviews' element={<Reviews/>} />
            <Route path='/blogs' element={<Blogs/>} />
            <Route path='/blogs/:id' element={<Blog/>}/>
            <Route path='/about-me' element={<MyPortfolio/>} />
            <Route path='*' element={<NotFound/>}/>
            <Route path='reset-password' element={<ForgotPassword/>}/>
        </Routes>
    </Navbar>
  );
} 

export default App;
