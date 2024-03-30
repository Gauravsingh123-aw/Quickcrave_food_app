import axios from "axios";
import { useEffect,useState } from "react";
import {useSelector} from "react-redux"
import { FcApproval } from "react-icons/fc";
import {useNavigate} from 'react-router-dom'
import '../css/past_orders.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Past_orders(){
    let [ord,setOrd]=useState([])
    let {currentUser}=useSelector(state=>state.userLogin);
    let Navigate=useNavigate();

    async function bringCartHistory(){
        let ans=await axios.post("http://localhost:4000/user-api/users",
        {username:currentUser.username},{
            headers:{
                Authorization:`Bearer ${sessionStorage.getItem('token')}`
            }
        });
      
        console.log(ans.data.payload)
        console.log(ans.data.payload.cart_history)
        setOrd(ans.data.payload.cart_history.reverse())
        
        
    }
    useEffect(()=>{bringCartHistory()},[]);

    return(
       
            <div className="main_pastorder">
                <h3>Your Past Orders</h3>
                { ord.map((value,ind)=>(
                    <div key={ind} className="main_container_pastorders">
                <div className="seg1_pastorders">
                    <div className="sec1_seg1_img"><img src={value.profileImageUrl} /></div>
                    <div className="sec2_seg1_details">
                        <div className="sec2_seg1_resname">{value.res_name}</div>
                        <div className="sec2_seg1_cat">{value.menu_category}</div>
                        <div>ORDER #{value._id}</div>
                    </div>
                    <div className="sec3_seg1_time">Order Delivered<FcApproval /></div>
                </div>
                <div className="seg2_pastorders">
                        <div className="sec1_seg2">
                            <div>{value.dish_name}</div>
                            <button onClick={()=>Navigate('/help')}>Help</button>
                        </div>
                        <div className="sec2_seg2">
                            Total Paid:  ₹{value.dish_price}
                        </div>
                </div>
                </div>
                ))}
                 <ToastContainer />
            </div>
            
   
    );
}

export default Past_orders