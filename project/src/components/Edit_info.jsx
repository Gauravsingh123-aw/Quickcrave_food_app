import { useState } from "react";
import  {useSelector} from 'react-redux'
import axios from 'axios'
function Edit_info() {

    let {currentUser}=useSelector(state=>state.userLogin);

    let [user, setUser] = useState();

    let [flag, updateflag] = useState(0);

    function handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        setUser({ ...user, [name]: value });
    }

    function handleEdit(event) {
        event.preventDefault();
        updateflag(1);
    }

    let id1 = data.id;
    // console.log('id',id1);

    async function handleSave(e) {
        e.preventDefault();
        if (user.username !== "" && user.password !== "") {
           let ans= await axios.post("https://quickcrave-food-app.vercel.app/user-api/user-update", user,{
            headers:{
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
           })
           console.log(ans.data.message);
              
        }
        else alert("enter data first");

    }


    return (
        <>
            <button onClick={handleEdit}>Edit Profile</button><br />
            <br /><br />

            {
                flag == 1 && <>

                    <input type="text" name="username" v placeholder="username" value={data.username} onChange={handleChange} write/>
                    <input type="text" name="fullname" v placeholder="Full Name" onChange={handleChange} />

                    <input type="email" name="email" placeholder="email" onChange={handleChange} />
                    <input type="tel" name="mobile" placeholder="mobile" onChange={handleChange} />
                    <input type="password" placeholder="enter new password" name="password" onChange={handleChange} />
                   
                    <button onClick={handleSave}>Save</button>
                </>
            }

        </>
    )
}
export default Edit_info