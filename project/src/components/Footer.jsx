import '../css/footer.css'
import logo4 from '../assets/logo4.png'
import { Link } from 'react-router-dom';
import { FaInstagramSquare, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
function Footer() {
    return (
        <div className='footer_main'>

            <div className="part1">
                <img src={logo4} />
            </div>
            <div className="part2">
                <h3>Company</h3>
                <Link to='/aboutus'><div>About</div></Link>
                <div>Carrer</div>
                <div>Team</div>
            </div>
            <div className="part3">
                <h3>Connect With Us on</h3>
                <Link to='http://www.instagram.com'><div target='blank'><FaInstagramSquare />  @quickcrave_insta</div></Link>
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