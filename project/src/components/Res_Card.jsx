import '../css/res_card.css'
import res1 from '../assets/rest1.jpg'
import res2 from '../assets/rest2.jpg'
import res3 from '../assets/rest3.jpg'
import res4 from '../assets/rest4.jpg'
import res5 from '../assets/rest5.jpg'
import { useState } from 'react'
function Res_Card(prop){
    let src;
    let img_arr=[res1,res2,res3,res4,res5];
    return(
        <>
    {
        Object.values(prop.props).map((value, index)=>{ 
            {src=img_arr[Math.round(Math.random()*4)]}
            return (
               
                <div key={index}>
                     {console.log(prop.props)}
                  <div  className="rescard_main">
            <div className="rescard_img"><img src={src}/></div>
            <div className="rescard_body">
                <span className='res_name_1'>{value.res_name}</span>
                <span className='tag_line_1'>{value.tag_line}</span>
                <span className='add_1'><span>{value.address}</span><span>{value.pincode}</span></span>
            </div>
        </div>
                </div>
              );
         })
    }



        </>
    )
}
export default Res_Card;