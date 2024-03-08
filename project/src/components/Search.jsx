import '../css/Search.css'
import { IoSearchSharp } from "react-icons/io5";

function Search(){
    return(
        <div className='search_main'>
            <h2 className="search_heading">You can search Food,Cuisine and Restaurants here !!</h2>
            <div className='search_menu'>
            <IoSearchSharp id="img"/>
            <input type="text" className="search_box" placeholder="search" name="search_box" />
            </div>
        </div>
    )
}
export default Search