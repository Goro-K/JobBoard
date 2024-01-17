import React from "react";

interface FormProps {
    title: string;
}
const Form : React.FC<FormProps> = ({title}) => {
    return (
        <form>
            <h3>{title}</h3>
            <label>
            <span>Your email:</span>
            <input type="email" name="email" required />
            </label>
            {title === "Login" || title === "Sign up" ? (
                <label>
                <span>Your password:</span>
                <input type="password" name="password" required />
                </label>
            ) : (
                <label>
                <span>Your message:</span>
                <textarea name="message" required></textarea>
                </label>
                )
            }
            <button>Submit</button>
        </form>
    )
}

export default Form;