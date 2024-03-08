import React from 'react'
import {useSelector} from "react-redux"
import {Navigate, Outlet, useLocation, useNavigate} from "react-router-dom"

const ProtectedRoute = ({children}) => {
    const {loginStatus} = useSelector((state) => state.userLogin);
    

        return (
            loginStatus ? <Outlet/> : <Navigate to="/signin"/>
        )

};

export default ProtectedRoute;