import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Menu_card from "./Menu_card";
import '../css/bannerfood.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import veg from "../assets/veg.png"
import nonveg from "../assets/non veg.png"
import { useSelector } from "react-redux";

function Banner_food() {

    //accessing loginstatus from redux
    let { currentUser, loginStatus } = useSelector(state => state.userLogin)

    const Navigate = useNavigate();
    const location = useLocation();
    const category = location.state;

    //used for storing food items filtered according to category
    const [food, setfood] = useState([]);

    let srcc;
    // Logic for fetching data based on category
    async function handleBannerFood() {
        let res = await axios.post("https://quickcrave-food-app.vercel.app/dish-api/getdataby_category", { data: category })
        console.log(res.data.payload)
        setfood(res.data.payload)
    }
    useEffect(() => { handleBannerFood() }, []);


    // Logic for adding the products to cart
    async function handleAddCart(value) {
        if (loginStatus === false) {
            Navigate('/signin')
        }
        else {
            let res = await axios.post("https://quickcrave-food-app.vercel.app/user-api/user-addcart", {
                username: currentUser.username,
                cart: value
            },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`
                    }
                });
            if (res.data.message === "Product added to cart") {
                // console.log(ans.data.payload)
                // console.log(ans.data.payload.cart_history)
                toast("Product added to cart!");
                setOrd(ans.data.payload.cart_history)
            }
            else if (res.data.message === "jwt expired") {
                
                toast("Session Expired")
            }
            else {
                toast("Error occured")
            }

        }

    }

    return (
        <div className="main_container_banner_food">
       
            {
                food.map((value) => (
                    <div className="rescard_main1" key={value.id}>
                        {/* {handlePhoto(value)} */}
                       
                        <div className="rescard_img"><img src={value.profileImageUrl} /></div>
                            <div className="rescard_body">
                                <div className='body_cardmenu'>
                                    <span>{value.dish_name}</span>
                                    <span>{value.food_preferance == "veg" ? <img src={veg} /> : <img src={nonveg} />}</span>
                                </div>
                                <div className='body_cardmenu'>
                                    <span>ᴄᴀᴛᴇɢᴏʀʏ: {value.menu_category}</span>
                                    <span>₹{value.dish_price}</span>
                                </div>
                                <div className='cardmenu_res_name'>{value.res_name ? value.res_name : "special offer get 40% off!"}</div>
                                <button onClick={() => { handleAddCart(value) }} className="button-18">Add to Cart</button>
                            </div>
                        </div>

                   
                ))
            }
             <ToastContainer />
    
        </div>
    )
}
export default Banner_food