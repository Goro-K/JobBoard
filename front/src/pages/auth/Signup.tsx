import React from 'react';
import Form from '../../components/Form';
import { useLocation } from 'react-router-dom';

const Login: React.FC = () => {
    const location = useLocation();
    const state = location.state as { userType: 'company' | 'user' };
    return (
        <div className="auth">
            <Form 
                title={`Sign up as ${state.userType[0].toUpperCase() + state.userType.slice(1)}`}
                userType={state?.userType}
            />
        </div>
    );
}

export default Login;