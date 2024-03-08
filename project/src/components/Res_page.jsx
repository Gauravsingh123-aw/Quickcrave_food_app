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

import { useLocation, useNavigate } from "react-router-dom";
import '../css/res_card.css'
import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import veg from "../assets/veg.png"
import nonveg from "../assets/non veg.png"
import { CiStar } from "react-icons/ci";
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Res_page() {

    //accessing loginstatus from redux
    let {currentUser,loginStatus}=useSelector(state=>state.userLogin)

    const [tap, setTap] = useState(0)
    const Navigate = useNavigate();
    const location = useLocation();

    let [cart,setCart]=useState({})
 
    const [flag,setFlag]=useState(0)
    const [food,setFood]=useState([])
    
    const data = location.state;
    let img_arr = [res1, res2, res3, res4, res5,res6, res7, res8, res9, res11,res20,res21,res23,res24,res25];
    let src;
    { src = img_arr[Math.round(Math.random() * 14)] }

    useEffect(()=>setFood(data.menu),[]);
    

    // Logic for adding the products to cart
    async function handleAddCart(value) {
        if (loginStatus === false) {
            Navigate('/signin')
        }
        else {
            let res=await axios.post("http://localhost:4000/user-api/user-addcart",{
                username:currentUser.username,
                cart:value
            });
          
                toast("Product added to cart!");
                setOrd(ans.data.payload.cart_history)
            
           
        }
        
    }



    //toggle apply for filtering the veg food only
    function handleToggle(){
        if(flag==0){
            setFlag(1);
            setFood(data.menu.filter((f)=>f.food_preferance==="veg"))
        }
        else{
            setFlag(0);
            setFood(data.menu)
        }
    }

    return (
        <div className='res_page_head'>
            <div className="res_page_heading">{data.res_name}</div>
            <div className='second_head'><button autoFocus id='first_option' onClick={() => { setTap(0); }}>Order Online</button><button id='second_option' onClick={() => { setTap(1) }}>Dine Out</button></div>
            {tap == 0 && <>
                <div className='res_page_body' >
                    <div>
                        <div className='res_name_a'>{data.res_name}</div>
                        <div className='res_name_location'>{data.address}</div>
                        <div className='res_name_location'>{data.tag_line}</div>
                    </div>
                    <div className='rating_a'><div>4.6<CiStar /></div><div>Rating</div></div>
                </div>
                <div className='toggle_Select'>Veg Food &nbsp;
                    <label class="switch">
                        <input type="checkbox" />
                        <span onClick={handleToggle} class="slider round"></span>
                    </label>
                </div>
                <div className='menu_res_reccomend'>Hot Menus here</div>
                <div className='menu_itemcards' >
                    {

                        food.map((value) => (

                            <div className='menu_itemcards1' key={value.id} >
                                {/* {handlePhoto(value)} */}
                                <div className='small_card_respage'>
                                    <div className='segment_1'>
                                    <div className='veg_nonveg'>{value.food_preferance == "veg" ? <img src={veg} /> : <img src={nonveg} />}</div>
                                    <div className='dish_name_respage'>{value.dish_name}</div>
                                    <div className='dish_price_respage'>₹ {value.dish_price}</div>
                                    <div className='dish_desc'>{value.desc}</div>
                                    </div>
                                    <div>
                                    <div className='respage_small_img'><img src={value.profileImageUrl} /> </div>
                                    <button className='button-7' onClick={() => { handleAddCart(value) }}>Add</button>
                                    </div>
                                    {console.log("cart data is",cart)}
                                </div>
                            </div>
                        ))
                    }
                </div></>}
                {
                    tap==1 && <>
                    <div className="res_dineout_images">asd</div>
                    <div className="res_dineout_Details">Hello ji</div>
                    </>
                }
                 <ToastContainer />
        </div>
        
    );
}
export default Res_page