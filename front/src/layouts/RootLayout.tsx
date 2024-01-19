import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
const Header: React.FC = () => {
    return (
        <div className='root-layout'>
            <header>
                <h1 className='header_title'>JobBoard</h1>
                <nav className='nav'>
                    <NavLink to="/" className='button nav_item'>Home</NavLink>
                    <NavLink to="/contact" className='button nav_item'>Contact</NavLink>
                    <NavLink to="/type_auth" className='button nav_item'>Login</NavLink>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default Header;