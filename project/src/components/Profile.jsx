import axios from "axios"
import { Outlet, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import '../css/Profile.css'
import { FaUser } from "react-icons/fa";
import { MdEmail, MdOutlineLocationCity } from "react-icons/md";
import { FaMobileButton } from "react-icons/fa6";
import { RiAdminLine } from "react-icons/ri";
import { GrTransaction } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"
function Profile() {

    const Navigate = useNavigate();

    let { currentUser } = useSelector(state => state.userLogin)
    let [user, setUser] = useState();
    let [flag,setflag]=useState(0);

    function handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        setUser({ ...user, [name]: value });
        setData({ ...data }, user);
    }

    async function handleSave(e) {
        e.preventDefault();
        if (user.username !== "" && user.email !== "" && user.mobile !== "" && user.address !== "") {
            let ans = await axios.post(`http://localhost:8000/user/`, user)

        }
        else alert("enter data first");

    }

    return (
        <>
            {/* {(currentUser != undefined && currentUser.user_type == "owner") && <span className="pr_head2">Restaurant Info</span>} */}
            <div className="profile_main">
                <span className="pr_head1">Personal Info</span>

                <div className="table">
                    <div className="common_coloumn">
                        <div><FaUser /></div>
                        <div><FaUser /></div>
                        <div><MdEmail /></div>
                        <div><FaMobileButton /></div>
                        <div><MdOutlineLocationCity /></div>
                    </div>
                    <div className="common_coloumn">
                        <div className="head_common_column">Username</div>
                        <div className="head_common_column">Name</div>
                        <div className="head_common_column">Email</div>
                        <div className="head_common_column">Mobile</div>
                        <div className="head_common_column">Address</div>
                    </div>
                    <div className="common_coloumn">
                        {currentUser != undefined && <div>{currentUser.username}</div>}
                        {currentUser != undefined && <div>{currentUser.name}</div>}
                        {currentUser != undefined && <div>{currentUser.email}</div>}
                        {currentUser != undefined && <div>{currentUser.mobile}</div>}
                        {currentUser != undefined && <div>{currentUser.address}</div>}
                    </div>
                    
                </div>
                <div>
                    <div onClick={()=>{flag===0 ? setflag(1):setflag(0)}} >Edit your Info</div><FaUserEdit className="edit_info_img" />
                   {flag==1 && <div className="common_coloumn">
                        <input type="text" className="equal" name="username" value={currentUser.username} placeholder="username" onChange={handleChange} write />
                        <input type="text" className="equal" name="name" defaultValue={currentUser.name} placeholder="Full Name" onChange={handleChange} />
                        <input type="text" className="equal" name="password" placeholder="password" onChange={handleChange} />
                        <input type="email" className="equal" name="email" defaultValue={currentUser.email} placeholder="email" onChange={handleChange} />
                        <input type="tel" className="equal" name="mobile" defaultValue={currentUser.mobile} placeholder="mobile" onChange={handleChange} />
                        <input type="text" className="equal"  placeholder="address" defaultValue={currentUser.address} name="address" onChange={handleChange} />
                        <button className="equal" onClick={handleSave}>Save</button>
                    </div>
                    }
                </div>
            </div>
            {(currentUser != undefined && currentUser.usertype == "owner") &&
                <div className="toresinfo" onClick={() => Navigate('/res_infor')}>Click here to see Restaurant Information</div>
            }


        </>
    )

}
export default Profile