import { GrRestaurant } from "react-icons/gr";

import '../css/owner_home.css'
import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux'

function Owner_Home(){
    const Navigate=useNavigate();
    const [flag,setflag]=useState(0)
    const [see,setsee]=useState(0)
    const [user,setUser]=useState({})
    const [resdata,setResdata]=useState({})


    let {currentUser}=useSelector(state=>state.userLogin);

    function handleDetails(e){

        // console.log(e)
        flag==1?setflag(0):setflag(1);
    }

    function handleChange(e){
        let name=e.target.name;
        let value=e.target.value;
        setResdata({...resdata,[name]:value});
        
    }

    // To submit form for the first time
    async function handleSubmit(e){
        e.preventDefault();
        console.log(resdata);
        
        // sending the res details submitted by seller
        let ans= await axios.post("https://quickcrave-food-app.vercel.app/res-api/res_detail",resdata)
        console.log(ans,ans.data)

        alert(ans.data.message);

        


    }
    
  
    
    return(
        <div className="owner_home_main">
        <div className="home_head" onClick={handleDetails}><marquee direction="right" behavior="alternate" scrollamount	={10}  className="marquee"><GrRestaurant />Add your Restaurant Details here</marquee> </div>
        <div className="form_main_owner">
        { flag==1 &&
        <form onSubmit={handleSubmit} >

            <input className="input_owner12" type="text" name="res_id" placeholder="Restaurant Id" onChange={handleChange}/><br/>
            <input className="input_owner12" type="text" name="res_name" placeholder="Restaurant Name" onChange={handleChange}/><br/>
            <input className="input_owner12" type="text" name="address" placeholder="Restaurant Address" onChange={handleChange}/><br/>
            <input className="input_owner12" type="text" maxLength={6} name="pincode" placeholder="PIN code" onChange={handleChange}/><br/>
            <input className="input_owner12" type="text" name="username" placeholder="Username of Seller" defaultValue={currentUser.username} onChange={handleChange} /><br/>
            <input className="input_owner12" type="tel" name="mobile" placeholder="Restaurant Phone no" onChange={handleChange} /><br/>
            <input className="input_owner12" type="tag" name="tagline" placeholder="Restaurant Tag line" onChange={handleChange}/><br/>
            <button className="btn"> Save </button>
            <div className="agreement">You agree to the terms and condition of <strong>Quickcrave</strong>.</div>
            </form>
        }
        </div>
        
        </div>
    )
}
export default Owner_Home