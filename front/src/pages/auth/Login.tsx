import React from 'react';
import Form from '../../components/Form';
import { NavLink, useLocation } from 'react-router-dom';

const Login: React.FC = () => {
    const location = useLocation();
    const state = location.state as { userType: 'company' | 'user' };
    return (
        <div className="auth">
            <Form 
                title={`Login as ${state.userType[0].toUpperCase() + state.userType.slice(1)}`}
                userType={state?.userType}
            />

            <p>Don't have an account as Company? <NavLink to="/type_auth/signup" state={{userType: 'company'}} className='nav_item'>Sign up</NavLink></p>
            <p>Don't have an account as User? <NavLink to="/type_auth/signup" state={{userType: 'user'}} className='nav_item'>Sign up</NavLink></p>
        </div>
        
    );
    
}

export default Login;