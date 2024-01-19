const pool = require('../utils/database');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
dotenv.config();

const TOKEN = process.env.TOKEN

exports.signupUser = async (req, res) => {
    let user = req.body;
    console.log(user)
    const regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/; //regex for email address
    const regexPhone = /^((\+)33|0)[1-9](\d{2}){4}$/; // Regex for french phone number


    const emailUser = await pool.query("SELECT Email FROM Users WHERE Email = ?", [user.email]); // Get all email address from companies
//     const nameCompany = await pool.query("SELECT CompanyName FROM Companies WHERE CompanyName = ?", [companyUser.companyName])

    if (!user.email || !regexMail.test(user.email) || (emailUser.length > 0 && emailUser[0].Email === user.email)) {
        return res.status(400).json({ message: "Incorrect email" });
    }

    if (!user.phone || !regexPhone.test(user.phone)) {
        return res.status(400).json({ message: "Incorrect phone number" });
    }
    if (!user.passwordconfirm) {
        return res.status(400).json({ message: "Password confirm cannot be empty" });
    }
    if (!user.userFirstname || user.Lastname) {
        return res.status(400).json({ message: "Incorrect company name" });
    }
    if (user.password !== user.passwordconfirm) {
        return res.status(400).json({message: "Pasword had to be the same"})
    }
    if (!user.age) {
        return res.status(400).json({message: "Incorrect Age"})
    }

    try { //Create a hash password
        user.password = await bcrypt.hash(user.password, 10)
        user.passwordconfirm = await bcrypt.hash(user.passwordconfirm, 10)
    } catch (err) {
        res.status(500).json({ err })
    }

    try { // Insert company in database
        const result = await pool.query("INSERT INTO Users (Firstname, Lastname, Phone, Email, Age, Password, PasswordConfirm) VALUES (?, ?, ?, ?, ?, ?, ?)", [user.userFirstname, user.userLastname, user.phone, user.email, user.age, user.password, user.passwordconfirm]);
        res.send({ message: 'User created successfully', insertId: Number(result.insertId) });
    } catch (err) {
        throw err;
    }
}
exports.getUser = async (req, res) => {
    
}
exports.loginUser = async (req, res) => {
    let {email, password} = req.body;
    const regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/;

    if(!email || !regexMail.test(email) || !password) {
        res.status(400).json({"message" : "authentification error"})
    }

    try {
        // Retrieve the password used in the database
        const query = await pool.query("SELECT UserID, FirstName, LastName, Email, Password FROM Users WHERE Email = ?", [email])
        if (query.length === 1) {
            const hashedPassword = query[0].Password; // the password is hashed

            const validPassword = await bcrypt.compare(password, hashedPassword); // we compare the hashedpassword with the password used
            if (validPassword) {
                const token = jwt.sign({
                    email: query[0].Email
                }, TOKEN,{ expiresIn: "24h" });
                res.header('Authorization', 'Bearer ' + token);

                return res.status(200).json(token);
              } else {
                res.status(401).json({ message: "Incorrect username/password pair" });
              }
        } else {
            return res.status(401).json({ "message": "Invalid email or password" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ "message": "Internal server error" });
    }
}

exports.getOneUser = async(req, res) => {
    const email = req.auth.email
    console.log(email)
    try {
        const result = await pool.query("select FirstName, LastName, Email, Phone, Age from Users WHERE Email = ?", [email]);
        console.log(result)
        res.send(result);
    } catch (err) {
        throw err;
    }
}
