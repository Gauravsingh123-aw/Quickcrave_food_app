import Navbar from './components/Navbar'
import './App.css'
import { Route, Routes } from "react-router-dom"
import Home from './components/Home'
// import UserContextProvider from './context/UserContextProvider'
import SignIn from './components/SignIn'
import Search from './components/Search'
import Past_orders from './components/Past_orders.jsx'
import Cart from './components/Cart'
import Help from './components/Help'
import Error from './components/Error'
import Register from './components/Register'
import Profile from './components/Profile'
import Edit_info from './components/Edit_info'
import Menu from './components/Menu'
import Add_Items from './components/Add_Items'
import History_owner from './components/History_owner'
import Help_FAQ from "./components/Help_FAQ"
import Help_Contact from './components/Help_Contact'
import Help_Query from './components/Help_Query'
import Owner_Home from './owner_component/Owner_Home'
// import Res_Context_Provider from './context/Res_Context_Provider'
import Res_infor from './owner_component/Res_infor.jsx'
import Res_page from './components/Res_page.jsx'
import Banner_food from './owner_component/Banner_food.jsx'
import Footer from './components/Footer.jsx'
import PrivateRoutes from './owner_component/protected.jsx'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { refreshCurrentUser } from "./redux/slices/userLoginSlice.js";

function App() {

  let { loginStatus } = useSelector(state => state.userLogin);
  let dispatch = useDispatch();

  useEffect(async () => {
    const token = sessionStorage.getItem('token');
    if (loginStatus === false && token !== null) {

      let obj = JSON.parse(sessionStorage.getItem('user'));
      // console.log("haanji",obj)
      if (obj.user_type === "user") {
        // console.log("pahuch gaye")   
        let ans = await axios.post("http://localhost:4000/user-api/token_verify", { username: obj.username }, {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        // console.log(ans.data.payload);
        dispatch(refreshCurrentUser(ans.data));
      }
      else if(obj.user_type==="seller"){
        let ans = await axios.post("http://localhost:4000/seller-api/token_verify", { username: obj.username }, {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        // console.log(ans.data.payload);
        dispatch(refreshCurrentUser(ans.data));
      }
    }
  }, [])

  return (
    <>
      <div className='main'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />

          <Route path="banner_food" element={<Banner_food />} />
          <Route path='help' element={<Help />}>
            <Route path='help_faq' element={<Help_FAQ />} />
            <Route path='help_contact' element={<Help_Contact />} />
            <Route path='help_query' element={<Help_Query />} />
          </Route>
          <Route path='register' element={<Register />} />

          <Route path='*' element={<Error />}>Error</Route>
          <Route element={<PrivateRoutes />}>
            <Route path='ownerhome' element={<Owner_Home />} />
            <Route path='menu' element={<Menu />} />
            <Route path='additems' element={<Add_Items />} />
            <Route path='history' element={<History_owner />} />
            <Route path='profile' element={<Profile />}>
              <Route path="editinfo" element={<Edit_info />} />
            </Route>
            <Route path='search' element={<Search />} />
            <Route path='cart' element={<Cart />} />
            <Route path='past_orders' element={<Past_orders />} />
          </Route>

          <Route path='res_infor' element={<Res_infor />} />
          <Route path='res_page' element={<Res_page />} />
        </Routes>
        <Footer />
      </div>
    </>

  )
}

export default App
