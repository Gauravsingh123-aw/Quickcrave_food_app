import axios from "axios"
import { useState } from "react"
import '../css/Profile.css'
import { FaUser } from "react-icons/fa";
import { MdEmail, MdOutlineLocationCity } from "react-icons/md";
import { FaMobileButton } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { useSelector } from "react-redux"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from "react-router-dom"
function Profile() {

    const Navigate = useNavigate();

    let { currentUser } = useSelector(state => state.userLogin)
   
    return (
        <>
            {/* {(currentUser != undefined && currentUser.user_type == "owner") && <span className="pr_head2">Restaurant Info</span>} */}
            <div className="profile_main">
                <span className="pr_head1">Personal Info</span>

                <div className="table">
                    <div className="common_coloumn">
                        <div><FaUser /></div>
                        <div><FaUser /></div>
                        <div><MdEmail /></div>
                        <div><FaMobileButton /></div>
                        <div><MdOutlineLocationCity /></div>
                    </div>
                    <div className="common_coloumn">
                        <div className="head_common_column">Username</div>
                        <div className="head_common_column">Name</div>
                        <div className="head_common_column">Email</div>
                        <div className="head_common_column">Mobile</div>
                        <div className="head_common_column">Address</div>
                    </div>
                    <div className="common_coloumn">
                        {currentUser != undefined && <div>{currentUser.username}</div>}
                        {currentUser != undefined && <div>{currentUser.name}</div>}
                        {currentUser != undefined && <div>{currentUser.email}</div>}
                        {currentUser != undefined && <div>{currentUser.mobile}</div>}
                        {currentUser != undefined && <div>{currentUser.address}</div>}
                    </div>
                    
                </div>
                
            </div>
            {(currentUser != undefined && currentUser.usertype == "owner") &&
                <div className="toresinfo" onClick={() => Navigate('/res_infor')}>Click here to see Restaurant Information</div>
            }

                <ToastContainer />
        </>
    )

}
export default Profile