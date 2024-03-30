import '../css/home.css'
import { useEffect, useState } from 'react';
// import UserContext from '../context/UserContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaRegStar } from "react-icons/fa";
import '../css/res_card.css'
import res1 from '../assets/res9.jpg'
import res2 from '../assets/res2.jfif'
import res3 from '../assets/res3.jfif'
import res4 from '../assets/res4.jfif'
import res5 from '../assets/res5.jfif'
import res6 from '../assets/res6.jfif'
import res7 from '../assets/res7.jpg'
import res8 from '../assets/res8.jfif'
import res9 from '../assets/res9.jfif'
// import res10 from '../assets/res10.jfif'
import res11 from '../assets/res12.jpg'
import res20 from '../assets/res20.jfif'
import res21 from '../assets/res21.jfif'

import res23 from '../assets/res23.jfif'
import res24 from '../assets/res24.jfif'
import res25 from '../assets/res25.jfif'
import visual from '../assets/visual_add (1).jpg'
import visual2 from '../assets/visual_add (2).jpg'
import video from '../assets/video.mp4'




function Home() {
    let img_arr = [res1, res2, res3, res4, res5, res6, res7, res8, res9, res11, res20, res21, res23, res24, res25];
    const [res, setres] = useState([]);
    const Navigate = useNavigate();
    async function BringResDetails() {
        let ans = await axios.get("http://localhost:4000/res-api/res_detail_home")
        setres(ans.data.payload)
    }
    useEffect(() => { BringResDetails() }, []);

    async function handleBanner(e) {
        let category;
        if (e.target.className == "banner_menu biryani bannermenu1") {
            category = "biryani"
        }
        else if (e.target.className == "banner_menu southindian") {
            category = "south_India"
        }
        else if (e.target.className == "banner_menu northindian") {
            category = "north_Indian"
        }
        else if (e.target.className == "banner_menu pizza") {
            category = "fast_food"
        }
        else if (e.target.className == "banner_menu chinese") {
            category = "chinese"
        }
        else if (e.target.className == "banner_menu cakes bannermenu2") {
            category = "cake"
        }
        Navigate("/banner_food", { state: category })

    }

    function handleResCard(value) {

        Navigate('/res_page', { state: value });

    }
    let rating = [4.2, 4.1, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 3.9, 3.8, 4.0];
    function goRestaurant() {
        let value = {
            "_id": "65e62fe92973abee78bcef00",
            "res_id": "6",
            "res_name": "The Pizza House",
            "address": "Secudarabad",
            "pincode": 500036,
            "username": "ramavatar@123",
            "mobile": 8492579420,
            "tagline": "Symbol of Authentication",
            "menu": [
                {
                    "menu_category": "fast_food",
                    "dish_name": "Party Pack Pizza",
                    "food_preferance": "non_veg",
                    "dish_price": "540",
                    "desc": "Serves 1 | Choose any Veg Medium Pizza from the delight/signature/supreme range & get a discount of FLAT Rs. 125!",
                    "res_name": "The Pizza House",
                    "profileImageUrl": "http://res.cloudinary.com/dzgbyo5vw/image/upload/v1709584802/bwxlhwjnhj311bxnrppk.avif",
                    "_id": "65e631a32973abee78bcef09",
                    "__v": 0
                },
                {
                    "menu_category": "fast_food",
                    "dish_name": "Paneer Tikka Butter Masala Pizza",
                    "food_preferance": "veg",
                    "dish_price": "480",
                    "desc": "Serves 1 | Get any Veg Pizza Medium from the delight/signature/supreme range, 2 pc. Cheese Garlic Bread & a Pepsi FREE!",
                    "res_name": "The Pizza House",
                    "profileImageUrl": "http://res.cloudinary.com/dzgbyo5vw/image/upload/v1709585131/ygaaw2yv7h40vv5ofqn5.avif",
                    "_id": "65e632eb2973abee78bcef22",
                    "__v": 0
                },
                {
                    "menu_category": "fast_food",
                    "dish_name": "Arctic Ice Cream Pizza",
                    "food_preferance": "veg",
                    "dish_price": "320",
                    "desc": "Serves 1 | Choose any Veg Medium Pizza from the delight/signature/supreme range & get a discount of FLAT Rs. 125!",
                    "res_name": "The Pizza House",
                    "profileImageUrl": "http://res.cloudinary.com/dzgbyo5vw/image/upload/v1709587058/bhppligjgbezftqq0lrn.avif",
                    "_id": "65e63a724b31c0fffdec4397",
                    "__v": 0
                },
                {
                    "menu_category": "fast_food",
                    "dish_name": "Mushroom Olives & Cheese Quesadillas",
                    "food_preferance": "veg",
                    "dish_price": "230",
                    "desc": "[3 Pcs] Soft Shell Tortilla Stuffed with Mushroom, Olives & Cheese. [Fat-8.2 per 100 g, Protein-7.9 per 100 g,",
                    "res_name": "The Pizza House",
                    "profileImageUrl": "http://res.cloudinary.com/dzgbyo5vw/image/upload/v1709587976/sekgarze8ogeifjug9ya.avif",
                    "_id": "65e63e094b31c0fffdec439e",
                    "__v": 0
                }
            ],
            "orders": [
                {
                    "username": "singhgaurav308",
                    "id": "65e63a724b31c0fffdec4397",
                    "order": {
                        "menu_category": "fast_food",
                        "dish_name": "Arctic Ice Cream Pizza",
                        "food_preferance": "veg",
                        "dish_price": "320",
                        "desc": "Serves 1 | Choose any Veg Medium Pizza from the delight/signature/supreme range & get a discount of FLAT Rs. 125!",
                        "res_name": "The Pizza House",
                        "profileImageUrl": "http://res.cloudinary.com/dzgbyo5vw/image/upload/v1709587058/bhppligjgbezftqq0lrn.avif",
                        "_id": "65e63a724b31c0fffdec4397",
                        "__v": 0
                    }
                }
            ],
            "order_history": [],
            "__v": 0
        }
        Navigate('/res_page', { state: value });

    }

    return (
        <>
            <div className="banner">
                <div onClick={handleBanner}><img className="banner_menu biryani bannermenu1" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1675667625/PC_Creative%20refresh/Biryani_2.png" width={144} height={165} /></div>
                <div onClick={handleBanner}><img className="banner_menu southindian" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1675667626/PC_Creative%20refresh/South_Indian_4.png" width={144} height={165} /></div>
                <div onClick={handleBanner}><img className="banner_menu northindian" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1675667625/PC_Creative%20refresh/North_Indian_4.png" width={144} height={165} /></div>
                <div onClick={handleBanner}><img className="banner_menu pizza" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029856/PC_Creative%20refresh/3D_bau/banners_new/Pizza.png" width={144} height={180} /></div>
                <div onClick={handleBanner}><img className="banner_menu chinese" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029848/PC_Creative%20refresh/3D_bau/banners_new/Chinese.png" width={144} height={165} /></div>
                {/* <div onClick={handleBanner}><img className="banner_menu cakes bannermenu2" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029845/PC_Creative%20refresh/3D_bau/banners_new/Cakes.png" width={144} height={165} /></div> */}
            </div>

            <div>
                <h2 className='home_res_recommen'>Order From Top Restaurants</h2>
                <div className='top_Res_order'>
                    {
                        res.map((value) =>
                        (
                            <div className="res_page_full" key={value.id}>
                                <div onClick={() => handleResCard(value)} className="rescard_main">
                                    <div className="rescard_img"><img src={img_arr[Math.round(Math.random() * 14)]} /></div>
                                    <div className="rescard_body">
                                        <span className='res_name_2'>{value.res_name}</span>
                                        <span className="rating"><FaRegStar />{rating[Math.round(Math.random() * 11)]}</span>
                                        <span className='tag_line_1'>{value.tag_line}</span>
                                        <span className='add_1'><span>{value.address}</span></span>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <div className="visual_add">
                <div className="img_visual_add">
                    <img src={visual} />
                </div>
                <div className="text_visual_add">
                    <div class="waviy">
                        <h2>Best & Fastest <span className="span_visual">Delivery</span> in your place.</h2>
                        <p>Order your food in anytime and we will safely deliver them straight to your home.</p>
                        <p>We will deliver it on time so you are not hungry.</p>

                    </div>

                </div>
            </div>
            <div className='top_picks_text'>Top Picks</div>
            <div className='top_picks'>

                <div className='top_picks_recommen'>
                    <img src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_628,h_704/TopPicks/DPartyfr4' className='top_pick_img' />
                    <img src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_628,h_704/TopPicks/PTBMPizza' />
                    <img src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_628,h_704/TopPicks/PNCAICP' />
                    <img src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_628,h_704/TopPicks/MOChQs' />
                </div>
                <button className='offers_button' onClick={goRestaurant}> <span class="sp">See Offers</span></button>
            </div>
            <h4 className='app_info'>Download our App</h4>
            <div className="video">
                <video src={video} autoPlay muted loop></video>
                <img className='video_image' src={visual2} width={450} />
            </div>


        </>
    );
}

export default Home;


