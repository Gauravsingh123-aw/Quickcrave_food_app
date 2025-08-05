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
        <main className="banner_food_main">
            <section className="banner_food_grid_section">
                <div className="banner_food_grid">
                    {food.map((value, idx) => (
                        <div className="banner_food_card" key={value.id || idx}>
                            <div className="banner_food_img_wrap">
                                <img src={value.profileImageUrl} alt={value.dish_name} className="banner_food_img" />
                            </div>
                            <div className="banner_food_info">
                                <div className='banner_food_title_row'>
                                    <span className="banner_food_name">{value.dish_name}</span>
                                    <span className="banner_food_type">{value.food_preferance === "veg" ? <img src={veg} alt="veg" /> : <img src={nonveg} alt="nonveg" />}</span>
                                </div>
                                <div className='banner_food_meta_row'>
                                    <span className="banner_food_category">{value.menu_category}</span>
                                    <span className="banner_food_price">₹{value.dish_price}</span>
                                </div>
                                <div className='banner_food_res_name'>{value.res_name ? value.res_name : "Special offer: get 40% off!"}</div>
                                <button onClick={() => { handleAddCart(value) }} className="banner_food_btn">Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
                <ToastContainer />
            </section>
        </main>
    )
}
export default Banner_food