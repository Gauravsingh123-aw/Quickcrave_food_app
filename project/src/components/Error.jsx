import {useNavigate} from 'react-router-dom'
export const Error=()=>{
    const navigate=useNavigate();
    return(
        <>
        <h4>Oops Page not found !!!!</h4>
        <button onClick={()=>navigate("/")}>Go back</button>
        </>
    )
}
export default Error