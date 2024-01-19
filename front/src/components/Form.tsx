import React from "react";

interface FormProps {
    title: string;
    userType?: 'user' | 'company';
}

const Form : React.FC<FormProps> = ({title, userType}) => {
    const handleSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);

        let url, body;

        if (title.includes("Sign up")) {
            url = userType === 'company' && title.includes("Sign up")
            ? 'http://localhost:3000/api/signupCompany'
            : 'http://localhost:3000/api/signupUser';

            body = {
                email: formData.get('email'),
                name: formData.get('name'),
                phone: formData.get('tel'),
                password: formData.get('password'),
                passwordConfirm: formData.get('password-confirm'),
            }

            if (userType === 'user') {
                body = {
                    ...body,
                    surname: formData.get('surname'),
                    age: formData.get('age'),
                }
            } else if (userType === 'company') {
                body = {
                    ...body,
                    presentation: formData.get('message'),
                }
            }
        } else {
            url = userType === 'company' && title.includes("Login")
            ? 'http://localhost:3000/api/loginCompany'
            : 'http://localhost:3000/api/loginUser';
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    body
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmitLogin }>
            <h3>{title}</h3>
            <label>
            <span>Your email:</span>
            <input type="email" name="email" required />
            </label>
            {title.includes("Login") ? ( // Formulaire de login
                <label>
                <span>Your password:</span>
                <input type="password" name="password" required />
                </label>
            ) : title.includes("Sign up") ? ( // Formulaire d'inscription
                <>
                    <label>
                        <span>{title.includes("Company") ? "Your Company" : "Your Name" }</span>
                        <input type="text" name="name" required />
                    </label>

                    {title.includes("Company") ? 
                    null : 
                    <label>
                        <span>Your surname:</span>
                        <input type="text" name="surname" required />
                    </label> 
                    }

                    <label>
                        <span>Your password:</span>
                        <input type="password" name="password" required />
                    </label>

                    <label>
                        <span>Confirm password:</span>
                        <input type="password" name="password-confirm" required />
                    </label>

                    {title.includes("Company") ? 
                    null : 
                    <label>
                        <span>Age :</span>
                        <input type="number" placeholder="age" id="age" name="age" min="13" max="70" required />
                    </label>
                    }
                
                    <label>
                        <span>Phone number :</span>
                        <input type="tel" placeholder="phone number" id="tel" name="tel" required />
                    </label> 

                    {title.includes("Company") ? 
                    <label>
                    <span>Your Presentation:</span>
                    <textarea name="message" required></textarea>
                    </label> 
                    : null
                    }
                
                </>
            ) : ( // Formulaire de contact
                <label>
                <span>Your message:</span>
                <textarea name="message" required></textarea>
                </label>
                )
            }
            <button type="submit">Submit</button>
        </form>
    )
}

export default Form;