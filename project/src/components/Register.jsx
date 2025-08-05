import { useState } from "react";
import axios from "axios";
import '../css/register.css'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Register() {
    const navigate = useNavigate();
    const [user, setUser] = useState({

    })
    const [em, setem] = useState("")

    function handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        setUser({ ...user, [name]: value });

    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(user)
        if (user.user_type === "user") {
            let res = await axios.post("https://quickcrave-food-app.vercel.app/user-api/user", user);
            console.log(res);
            if (res.status === 201) {
                if (res.data.message === 'User created') {
                    navigate('/signin');
                    toast.success("User Registration Successful",{
                        position:"bottom-right"
                    });
                    
                }
            }
            else {
                setem(res.data.message);
                toast.warning(res.data.message,{
                    position:"bottom-right"
                })
            }

        }
        else if(user.user_type==="seller"){
            let res = await axios.post("https://quickcrave-food-app.vercel.app/seller-api/seller", user);
            console.log(res);
            if (res.status === 201) {
                if (res.data.message === 'seller created') {
                    navigate('/signin');
                    toast.success("Seller Registration Successful",{
                        position:"bottom-right"
                    });
                    
                }
            }
            else {
                setem(res.data.message);
            }
        }
        else{
            setem("Select User Type");
        }
    }
    return (

        <div className="form_main new_theme_bg">
            <form onSubmit={handleSubmit} className="form new_form" >
                <h2 className="register_title">Create Account</h2>
                <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="input_field" />
                <input type="text" name="username" minLength={4} placeholder="Username" onChange={handleChange} className="input_field" />
                <input type="password" name="password" minLength={4} placeholder="Password" onChange={handleChange} className="input_field" />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} className="input_field" />
                <input type="tel" name="mobile" minLength={10} placeholder="Mobile No" onChange={handleChange} className="input_field" />
                <input type="text" name="address" placeholder="Address" onChange={handleChange} className="input_field" />
                <div className="select_type radio_group">
                    <label className="radio_label"><input type="radio" name="user_type" value="user" onChange={handleChange} /> User</label>
                    <label className="radio_label"><input type="radio" name="user_type" value="seller" onChange={handleChange} /> Seller</label>
                </div>
                <button className="continue_signin_btn new_btn">Continue</button>
                <div className="error_color">{em}</div>
                <div className="policy">By creating an account, I accept the <span className="policy_link">Terms & Conditions</span></div>
            </form>
            <ToastContainer />
        </div>
    )
}
export default Register