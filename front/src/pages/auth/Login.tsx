import React from 'react';
import Form from '../../components/Form';

const Login: React.FC = () => {
    return (
        <div className="login">
            <Form 
                title="Login"
            />
            <p>Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
    );
}

export default Login;