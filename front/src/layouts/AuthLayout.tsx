// import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom"

const AuthLayout: React.FC = () => {
    return (
    <div className="auth-layout">

        <h2>Website Authentification</h2>
        <p>Welcome to our platform. Please select your role to proceed with the authentication.</p>
        <nav className="auth-nav">
            <NavLink to="login" state={{userType: 'company'}} className='button nav_item'>Are you a Company?</NavLink>
            <NavLink to="login" state={{userType: 'user'}} className='button nav_item'>Are you a User?</NavLink>
        </nav>
        
        <Outlet />
    </div>
  )
}

export default AuthLayout