// import UserContext from "../context/UserContext"
import {  useEffect, useReducer, useState } from "react"
import '../css/history_owner.css'
import axios from "axios"
import { useSelector } from "react-redux"
import { FcApproval } from "react-icons/fc";
import {useNavigate} from 'react-router-dom'

import '../css/past_orders.css'
function History_owner(){
    const Navigate=useNavigate();

    //bringing the data of restaurant through current user
    let {currentUser}=useSelector(state=>state.userLogin)
    
    let [res,setRes]=useState([]) // to hold record of restaurant

    async function bringResDetails(){
        let ans=await axios.post("http://localhost:4000/res-api/gettingOrderHistory",{username:currentUser.username})
        console.log("res",ans.data.payload[0].order_history);
        setRes(ans.data.payload[0].order_history)
    }
    useEffect(()=>{bringResDetails()},[]);
    return (
        <div className="main_pastorder">
           
            {
                res.map((value,index)=>(
                    <div key={index} className="main_container_pastorders">
                <div className="seg1_pastorders">
                    <div className="sec1_seg1_img"><img src={value.order.profileImageUrl} /></div>
                    <div className="sec2_seg1_details">
                       <div className="sec2_seg1_resname">Ordered by:<span id="username_history">{value.username}</span></div>
                        <div className="sec2_seg1_cat">{value.order.menu_category}</div>
                        <div>ORDER ID#{value.id}</div>
                    </div>
                    <div className="sec3_seg1_time">Order Accepted<FcApproval /></div>
                </div>
                <div className="seg2_pastorders">
                        <div className="sec1_seg2">
                            <div>{value.dish_name}</div>
                            <button onClick={()=>Navigate('/help')}>Help</button>
                        </div>
                        <div className="sec2_seg2">
                            Total Received:  ₹{value.order.dish_price}
                        </div>
                </div>
                </div>
                ))
            }
        </div>
    )
}
export default History_owner