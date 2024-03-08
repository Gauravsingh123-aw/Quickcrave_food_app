import '../css/Menu_card.css'
import axios from 'axios'

import veg from "../assets/veg.png"
import nonveg from "../assets/non veg.png"

function Menu_card(prop){

    // let [se,setSe]=useState(0)
    // let [val,setVal]=useState("")
    // async function Editfood(ide){
        
    //     // await axios.put(`http://localhost:8000/menu?id=${ide}`,)

    // }
    // function foodedit(e){
    //     // let name=e.target.name;
    //     let value=e.target.value;
    //     setVal(value);

    // }
    // async function foodsave(e,ide){
    //     e.preventDefault();
    //     prop.props.dish_price=val;
    //     await axios.put(`http://localhost:8000/menu?id=${ide}`,prop.props.dish_price)
    //     .then((msg)=>console.log(msg.data))
    //     .catch((Error)=>console.log(Error))

        
    // }


    return(
        <>
         {/* {console.log(prop.props.profileImageUrl)} */}
           <div className="card_main">
            
                <img  src={prop.props.profileImageUrl}/>
                <div className="body">
                    <div className='body_cardmenu'>
                        <span>{prop.props.dish_name}</span>
                        <span>{prop.props.food_preferance=="veg"?<img src={veg} />:<img src={nonveg} />}</span>
                    </div>
                    <div className='body_cardmenu'>
                        <span>ᴄᴀᴛᴇɢᴏʀʏ: {prop.props.menu_category}</span>
                        <span>₹{prop.props.dish_price}</span>
                    </div>
                    <div className='cardmenu_res_name'>{prop.props.res_name ?prop.props.res_name:"special offer get 40% off!"}</div>
                    {/* <button className='bn60' onClick={()=>{setSe(1)}}>Edit</button> */}
                </div>
                {/* {se==1 && <> <input type='number' name='dish_price' placeholder='enter the new price' onClick={foodedit}/>
                        <button onClick={foodsave(Event,prop.props.id)}>Save</button>
                </>} */}
           </div>
        </>
    )
}
export default Menu_card;