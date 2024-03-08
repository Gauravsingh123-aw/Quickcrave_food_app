// import UserContext from "../context/UserContext"
// import { useContext } from "react"
import '../css/help.css'
import { NavLink,Link } from "react-router-dom"
import { Outlet } from "react-router-dom"

function Help(){
    // const {data}=useContext(UserContext);

    return(
        <div className="help_page_main">
            <h2>Help & Support</h2>
            <div className="segment">
                <div className="left_trousel">
                <NavLink to="help_faq" className="trousel">FAQ</NavLink>
                <Link to="help_contact" className="trousel">Contact Us</Link>
                <Link to="help_query" className="trousel">Raise a Query</Link>
                </div>
                <div className="right_trousel">
                <Outlet/>
                </div>
            </div>
            
        
        </div>
    )
}
export default Help