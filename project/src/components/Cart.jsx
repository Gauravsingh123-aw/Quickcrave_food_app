import veg from '../assets/veg.png'
import nonveg from '../assets/non veg.png'
import { } from '../css/cart.css'
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Cart() {

    // getting data from redux
    let {currentUser,loginStatus}=useSelector(state=>state.userLogin)

    const [cartData,setCartData]=useState([])  //maintains the cart data on UI

    const Navigate=useNavigate();
    const [dataSent,setDataSent]=useState({})  // this state is to render page when delete request is send from cart
    let deleteCart;
    //Logic to bring cart details from user schema
    async function bringCartdetails(){
        let res=await axios.post("http://localhost:4000/user-api/users",{username:currentUser.username})
        console.log(res.data.message)
        if(res.data.message==="users data fetched"){
        setCartData(res.data.payload.cart)
        }
        else if(res.data.message==="jwt expired"){
            toast("Session Expired!!")
        }
        
    }
    useEffect(()=>{bringCartdetails()},[dataSent,cartData,deleteCart]);

    //Logic to remove product from cart
    async function handleRemoveProduct_cart(id){
        console.log(id)
        let data_tobeSent={
            username:currentUser.username,
            dish_id:id
        }
        setDataSent(data_tobeSent);
        let rep=await axios.post("http://localhost:4000/user-api/user_removecart",data_tobeSent);
        console.log(rep.data)

    }

    //Logic to place order at last
    async function handleOrderfinal(){
        toast("Order Placed Succesfully !! ");
        console.log("cartdata",cartData)
        // we have to perform 3 operations here
        // 1- add cart data to order history of user
      
        let history_data=await axios.post("http://localhost:4000/user-api/user_order_history",{
            username:currentUser.username,
            cart:cartData
        });

        // 2- send the cart data to respective restaurant orders
        let  res_order=await axios.post("http://localhost:4000/res-api/getting_order",{
            username:currentUser.username,
            
            cart:cartData
        })
        console.log(res_order.data);
        
        // 3- delete cart data of user
        deleteCart=await axios.post("http://localhost:4000/user-api/delete_Cart",{username:currentUser.username});

    }


    let sum=0;
    return (
        
        <div className="chead">    
            {cartData.length!==0 &&  cartData.map((value)=>(
                <div className="cart_head" key={value.id}>
                    {/* {handlePhoto(value)} */}
                    <div className='cardpage_small_img'><img src={value.profileImageUrl} /></div>
                    <div className='cart_name_respage'><span className="dish_namecard">{value.dish_name}</span><span>ᴄᴀᴛᴇɢᴏʀʏ: {value.menu_category}</span></div>
                    <div className='dish_price_respage'>₹ {value.dish_price}</div>
                    <div className="sum_cart_payment">{sum+=parseInt(value.dish_price)}</div>
                    <div className='veg_nonveg'>{value.food_preferance == "veg" ? <img src={veg} /> : <img src={nonveg} />}</div>
                    <div><button onClick={()=>{handleRemoveProduct_cart(value._id)}} className="button-24">Remove</button></div>
                </div>  ))
            }{(cartData.length) ? <>
            <div className="price_data">Your Paytotal is ₹{sum}</div>
            <div>
            <button className="button-41" onClick={handleOrderfinal}>Proceed here</button></div>
            </>:<div className='empty_Cart_image'><img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0" /><h3>Cart is empty</h3></div>}
            <ToastContainer />
        </div>
    )
}
export default Cart