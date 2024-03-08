import { useEffect, useState } from 'react';
import './Navbar.css'
import { FiLogIn } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { FaHistory, FaShoppingCart, FaUser, FaBars } from "react-icons/fa";
import { BiFoodMenu } from "react-icons/bi";
import { IoIosAdd } from "react-icons/io";
import { IoSearchSharp, IoHelp } from "react-icons/io5";
import { MdOutlineDiscount, MdOutlineRestaurantMenu } from "react-icons/md";
import { PiNotepadDuotone } from "react-icons/pi";
import { NavLink, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo2.png'
import { useSelector } from 'react-redux';

function Navbar() {
    const Navigate = useNavigate();

    let { currentUser, loginStatus } = useSelector(state => state.userLogin)

    const handleLogin = () => {

        if (loginStatus == true) {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            dispatch(userLoginLifeCycle())
            // sessionStorage.removeItem('token');
            // sessionStorage.removeItem('user');
            // setLogin_name("");
        }
        // sessionStorage.removeItem('token');
        // sessionStorage.removeItem('user');

    };
    function handleNav() {
        let div = document.getElementsByClassName('second_part_nav');
        // console.log(div)
        div[0].classList.add('active')
    }
    useEffect(()=>{if(currentUser==null){currentUser={}}})
    return (
        <div className='nav_border'>
            
            <nav className='navbar_main'>

                
                {(currentUser.user_type === "user" || currentUser.user_type === undefined) ? (<NavLink to='/'><img src={logo} className='img_logo' /></NavLink>) : (<NavLink to='/ownerhome'><img src={logo} className='img_logo' /></NavLink>)}
                {loginStatus == true && <NavLink to='/profile' className="login point"><FaUser className="icon" />{currentUser.name}</NavLink>}

                <div className='second_part_nav'>
                    {(currentUser.user_type == "user" && loginStatus == true) && <>
                        <NavLink to="/search" className='point'><IoSearchSharp className="icon" />Search</NavLink>
                        <NavLink to="/cart" className='point'><FaShoppingCart className="icon" />Cart</NavLink>
                        <NavLink to="/past_orders" className='point'><FaHistory className="icon" />History</NavLink>

                    </>
                    }
                    {(currentUser.user_type == "seller" && loginStatus == true) && <>
                        <NavLink to="/menu" className='point'><MdOutlineRestaurantMenu className="icon" />Menu</NavLink>
                        <NavLink to="/additems" className='point'><BiFoodMenu className="icon" />Orders</NavLink>
                        <NavLink to="/history" className='point'><PiNotepadDuotone className="icon" />Order History</NavLink>
                    </>
                    }

                    <NavLink to={loginStatus === false ? "/signin" : "/"} className='point1' onClick={handleLogin}><FiLogIn />{loginStatus == false ? <>Login</> : <>Logout</>}</NavLink>
                    <NavLink to="/help" className='point'><IoHelp className="icon" />Help</NavLink>

                    <div className="close" onClick={() => { let a = document.getElementsByClassName("second_part_nav"); a[0].classList.remove('active') }}><IoCloseSharp /></div>

                </div>
                <div className="mobile" onClick={handleNav}>

                    <FaBars />
                </div>
            </nav>
                
        </div>
    );
}
export default Navbar