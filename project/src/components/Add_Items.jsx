// import UserContext from "../context/UserContext"
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios"
import '../css/additems.css'
import { useState } from "react";
import veg from '../assets/veg.png'
import nonveg from "../assets/non veg.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Add_Items() {

    //getting the data from redux
    let { currentUser } = useSelector(state => state.userLogin);
    const [ord, setOrd] = useState([]);
    const [change, setChange] = useState(0);


    //getting the order details from restaurant-api
    async function bringOrderDetails() {
        let name;
        let ans = await axios.post("http://localhost:4000/res-api/res_details", { username: currentUser.username });
     
        console.log("uname", ans.data.payload[0].orders)
        setOrd(ans.data.payload[0].orders)
        

    }

    useEffect(() => { bringOrderDetails(); setChange(0) }, [change]);

    //Logic for confirming the order
    async function confirmOrder(orderDetails) {
        // we need to perform two operations 
        // 1-save data to res order history

        let ans = await axios.post("http://localhost:4000/res-api/adding_orderhistory", { ord: orderDetails })
        // 2-deleting data from order of res 
        let ans1 = await axios.post("http://localhost:4000/res-api/order_rejection", { order: orderDetails })
        if (ans1.data.message === "deleted the order from order") {
            toast("order Approved");
        }
        setChange(1);
    }

    //Logic for cancelling the order
    async function rejectOrder(order) {
        //deleting the data from order of res
        let ans = await axios.post("http://localhost:4000/res-api/order_rejection", { order: order })
        // console.log(ans.data.payload)
        if (ans.data.message === "deleted the order from order") {
            toast("order rejected");
        }
        setChange(1);
    }

    return (

        <div className="main_pastorder">
            {ord.length!=0 ? 
                ord.map((value, index) => (
                    <div key={index} className="order_main_container">
                        
                        <div className="first_sec_order_recieved">
                            You Recieved an Order from : <span className="name_customer">{value.username}</span>
                        </div>

                        <div className="second_sec_recieved">
                            <div>Order Details are :</div>
                            <div className="subclass_second_sec_recieved">
                                <div className="img_subclass_second_sec_recieved"><img src={value.order.profileImageUrl} /></div>

                                <div className="details_subclass_second_sec_recieved">
                                    <div className="dishname_text_ordersubclass">{(value.order.dish_name.toUpperCase()).replace('_', ' ')}</div>
                                    <div></div>
                                    <div>{value.order.menu_category}</div>
                                    <div>Payment to be expected: ₹{value.order.dish_price}</div>
                                </div>
                                <div className="btn_subclass_second_sec_recieved">
                                    <button className="btn001" onClick={() => { confirmOrder(value) }}>Confirm</button>
                                    <button className="btn002" onClick={() => { rejectOrder(value) }}>Reject</button>
                                </div>
                            </div>




                        </div>

                    </div>
                )):<h2>No orders Received yet..</h2>
            } 
            <ToastContainer />
        </div>

    )
}
export default Add_Items


