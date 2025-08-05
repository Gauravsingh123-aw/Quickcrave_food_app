import { useNavigate } from "react-router-dom"
import './signin.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { userLoginLifeCycle } from "../redux/slices/userLoginSlice";
import { current } from "@reduxjs/toolkit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function SignIn() {
 
  let dispatch = useDispatch();
  let navigate=useNavigate();

    const Navigate=useNavigate();
    let [user,setUser]=useState({
     
    })

    //getting data from redux store
    let {currentUser,loginStatus,errorMessage,isPending}=useSelector(state=>state.userLogin)
     

    async function handleSubmit(event){
      event.preventDefault();
      if(user.user_type !== undefined && user.username!==undefined && user.password!==undefined){
      dispatch(userLoginLifeCycle(user));
      }
      else{
        if(user.user_type === undefined){
        toast.warning("select usertype",{
          position:"bottom-right"
        })}
        else if(user.username===undefined){
          toast.warning("select username",{
            position:"bottom-right"
          })}
          else if(user.password===undefined){
            toast.warning("select password",{
              position:"bottom-right"
            })}
          }
        }
      
    
    useEffect(()=>{
      if(loginStatus===true ){
        if(currentUser.user_type==="user"){
          navigate('/');
        }
        else{
          navigate('/ownerhome');
        }
      }
    },[loginStatus]);

    function handleChange(event){
    
        let name=event.target.name;
        let value=event.target.value;
        setUser({...user,[name]:value});
    }

  return (
    <>

    <div className="form_main1 new_theme_bg">
                <div  className="error_message_toast">{errorMessage!=="" &&<>{errorMessage}</>}</div>

      <form onSubmit={handleSubmit} className="signin_form new_form">
        <h2 className="register_title">Sign In</h2>
        <div className="select_type radio_group">
          <label className="radio_label"><input type="radio" name="user_type" value="user" onChange={handleChange} /> User</label>
          <label className="radio_label"><input type="radio" name="user_type" value="seller" onChange={handleChange} /> Seller</label>
        </div>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} className="input_field" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="input_field" />
        <button className="btn1 new_btn">Sign In</button>
        <div className="register_link" onClick={() => Navigate("/register")}>New User? Register here..</div>
      </form>
      <ToastContainer />
    </div>
    </>
  )
}
export default SignIn;

