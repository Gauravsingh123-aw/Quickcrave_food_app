import '../css/footer.css'
import logo4 from  '../assets/logo4.png'
import { FaInstagramSquare ,FaFacebook} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
function Footer(){
    return(
        <div className='footer_main'>
           
            <div className="part1">
                <img src={logo4}/>
            </div>
            <div className="part2">
                <h3>Company</h3>
                <div>About</div>
                <div>Carrer</div>
                <div>Team</div>
            </div>
            <div className="part3">
                    <h3>Connect With Us on</h3>
                    <div><FaInstagramSquare />  @quickcrave_insta</div>
                    <div><FaFacebook /> @quickcrave_fb</div>
                    <div><FaXTwitter /> @quick_x</div>
            </div>
            <div className="part4">
                    <h3>We Deliver to</h3>
                    <div>Delhi</div>
                    <div>Mumbai</div>
                    <div>Hyderabad</div>
                    <div>Banglore</div>
                    <div>Noida</div>
                    <div>Gurgaon</div>
            </div>

        </div>
    )
}
export default Footer;