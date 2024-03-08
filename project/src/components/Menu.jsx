import { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import axios from "axios";
import Menu_card from "../owner_component/Menu_card";
import { useSelector } from "react-redux";
import '../css/Menu_card.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Menu() {

    let [init, setInit] = useState(0);
    let [file, setFile] = useState(null)
    const [menu1, setMenu1] = useState({}) //to hold menu data entered by seller
    const [item, setitem] = useState([]) // contains all menu items of that restaurant
    const [flag, setFlag] = useState(0);

    const [mess, setMess] = useState("")  // give message when item is added

    const [data, setData] = useState({})  //for storing restaurant data


    function handleAddMenu() {
        flag == 1 ? setFlag(0) : setFlag(1);
    }

    let { currentUser } = useSelector(state => state.userLogin);


    // // saving the changes )(OnChange method)
    function handleChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        setMenu1({ ...menu1, [name]: value });
    }

    function saveFile(event) {

        console.log(event.target.files[0]);
        setFile(event.target.files[0]);
    }

    // //successfully adding menu items to res schema

    async function handleSubmit(e) {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('userobj', JSON.stringify({ menu: menu1 }));
        formdata.append('image', file)
        console.log(formdata)

        //sending data to dish schema
        let a = await axios.post("http://localhost:4000/dish-api/add_dish_data", formdata)
        console.log(a.data.payload)
        if (a.data.message === "dish added") {
            let resData_sent = {
                m: a.data.payload,
                rname: data.res_name
            }
            let ans = await axios.post("http://localhost:4000/res-api/res_menuadd", resData_sent)
            console.log(ans.data)
            setMess(ans.data.message);

        }

    }
    async function handleError(req, res) {
        let ans = await axios.post("http://localhost:4000/res-api/res_details", {
            username: currentUser.username
        });
        // console.log(ans.data.payload[0])
        
            setData(ans.data.payload[0]);
            setitem(ans.data.payload[0].menu);
        
        
        // console.log("menu is",data.menu);
    }

    // Bringing the Restaurant Details and saving it in 'data'
    useEffect(() => { handleError() }, [mess])

    // // displaying the menu items on card




    return (
        <>
            {data !== undefined &&
                <div className="menu_head_heightset">
                    <div onClick={handleAddMenu} className="add_menu_button">Add a menu<IoIosAddCircle /></div>
                    {flag == 1 && <div className="form_box">
                        <form className="add_menuform">
                            <div className="addmenu_internal">
                                <label for="category">Enter the Category</label>
                                <select name="menu_category" onChange={handleChange} id="category">
                                    <option>...</option>
                                    <option value="north_Indian">North Indian</option>
                                    <option value="south_India">South Indian</option>
                                    <option value="fast_food">Fast Food</option>
                                    <option value="biryani">Biryani</option>
                                    <option value="continental">Continental</option>
                                    <option value="dessert">Dessert</option>
                                    <option value="cake">Cakes</option>
                                    <option value="chinese">Chinese</option>
                                    <option value="drinks">Drinks</option>
                                </select></div>
                            <div className="addmenu_internal">
                                <label for="item">Enter the dish_name</label>
                                <select name="dish_name" onChange={handleChange} id="item">
                                    <option>...</option>
                                    <option value="paneer_butter_masala">Paneer Butter masala</option>
                                    <option value="butter_chicken">Butter Chicken</option>
                                    <option value="chole_bhature">Chole Bhature</option>
                                    <option value="daal_makhani">Daal Makhani</option>
                                    <option value="samosa">Samose</option>
                                    <option value="kaju_katli">Kaju Katli</option>
                                    <option value="dosa">Dosa</option>
                                    <option value="idli">Idli</option>
                                    <option value="uttapam">Uttapam</option>
                                    <option value="mendu_vada">Mendu Vada</option>
                                    <option value="burger">Burger</option>
                                    <option value="pizza">Pizza</option>
                                    <option value="french_fries">French Fries</option>
                                    <option value="cold_drink">Cold Drink</option>
                                    <option value="virgin_mohito">Virgin Mohito</option>
                                    <option value="veg_biryani">Veg Biryani</option>
                                    <option value="mutton_biryani">Mutton Biryani</option>
                                    <option value="egg_biryani">Egg Biryani</option>
                                    <option value="chicken_biryani">Chicken Biryani</option>
                                    <option value="noodles">Noodles</option>
                                    <option value="chicken_noodles">Chicken Noodles</option>
                                    <option value="noodles_manchurian">Noodles Manchurian</option>
                                    <option value="chicken_burger">Chicken Burger</option>
                                    <option value="korean_cheese_burger">Korean Cheese Delight Burger</option>
                                    <option value="burger_chicken_peri">Grilled Peri Peri Chicken Burger</option>
                                    <option value="bavarain_chocolate_ice_cream">Bavarian Chocolate Ice cream</option>
                                    <option value="mississippi_ice_cream">Mississippi Mud Ice Cream</option>
                                    <option value="malabar_fish_curry">Malabar Fish Curry with Steamed Rice</option>
                                    <option value="malaysian_chicken_Curry">Malaysian Chicken Curry with Selasih Rice</option>
                                    <option value="caribbean_chicken">Caribbean Grilled Chicken with Herbed Rice</option>
                                    <option value="classic_chicken_curry">Classic Chicken Curry with Rice</option>
                                    <option value="paneer_makhani_biryani">Paneer Makhani Biryani</option>
                                    <option value="Paneer Tikka Butter Masala Pizza">Paneer Tikka Butter Masala Pizza</option>
                                    <option value="Party Pack Pizza">Party Pack Pizza</option>
                                    <option value="Arctic Ice Cream Pizza">Arctic Ice Cream Pizza</option>
                                    <option value="Mushroom Olives & Cheese Quesadillas">Mushroom Olives & Cheese Quesadillas</option>



                                </select></div>
                            <div className="addmenu_internal">
                                <label for="food_p">Enter the Food Preferance</label>
                                <input type="radio" name="food_preferance" value="veg" onChange={handleChange} />Veg
                                <input type="radio" name="food_preferance" value="non_veg" onChange={handleChange} /> Non Veg
                                <input type="radio" name="food_preferance" value="vegan" onChange={handleChange} /> Vegan</div>
                            <div className="addmenu_internal">
                                <label>Enter the Price of the food per quantity in Rs: </label>
                                <input type="number" name="dish_price" onChange={handleChange} className="addmenu_internal_input" /><br /></div>
                            <div className="addmenu_internal">
                                <lable>Enter description of dish:</lable>
                                <textarea name="desc" onChange={handleChange} rows={2} cols={17} className="addmenu_internal_input" />
                            </div>
                            <div className="addmenu_internal">
                                <label>Restaurant Name:</label>
                                <select name="res_name" onChange={handleChange}>
                                    <option ></option>
                                    <option value={data.res_name} >{data.res_name}</option>
                                </select></div>
                            <input type="file" name="image" onChange={saveFile} className="img_class" />
                            <button onClick={handleSubmit} className="addmenu_btn">Save</button>
                            <div>{mess}</div>
                        </form></div>
                    }

                    <div className="see_menu_option">You can see menu items here</div>
                    {item !== null && <div className="menu_items">
                        {item.map((value, index) => {
                            return (
                                <div key={index}>
                                    <span> <Menu_card props={value} /></span>
                                </div>
                            );
                        })}
                    </div>}
                </div>
            }
            {data === undefined && <h2 className="res_not_Added">Add your Restaurant Detail first</h2>}
            <ToastContainer />
        </>


    );
}
export default Menu