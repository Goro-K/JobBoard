const pool = require('../utils/database');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
dotenv.config();

const TOKEN = process.env.TOKEN;

exports.signupCompany = async (req, res) => {
    let companyUser = req.body;
    console.log(companyUser)
    const regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/; //regex for email address
    const regexPhone = /^((\+)33|0)[1-9](\d{2}){4}$/; // Regex for french phone number
    const emailCompany = await pool.query("SELECT EmailAddress FROM Companies WHERE EmailAddress = ?", [companyUser.companyemail]); // Get all email address from companies

    if (!companyUser.companyemail || !regexMail.test(companyUser.companyemail) || (emailCompany.length > 0 && emailCompany[0].EmailAddress === companyUser.companyemail)) {
        return res.status(400).json({ message: "Incorrect email" });
    }

    if (!companyUser.phone || !regexPhone.test(companyUser.phone)) {
        return res.status(400).json({ message: "Incorrect phone number" });
    }
    if (!companyUser.passwordconfirm) {
        return res.status(400).json({ message: "Password confirm cannot be empty" });
    }
    if (!companyUser.companyName) {
        return res.status(400).json({ message: "Incorrect company name" });
    }
    if (companyUser.password !== companyUser.passwordconfirm) {
        return res.status(400).json({message: "Password had to be the same"})
    }

    try { //Create a hash password
        companyUser.password = await bcrypt.hash(companyUser.password, 10)
        companyUser.passwordconfirm = await bcrypt.hash(companyUser.passwordconfirm, 10)
    } catch (err) {
        res.status(500).json({ err })
    }

    try { // Insert company in database
        const result = await pool.query("INSERT INTO Companies (CompanyName, Phone, EmailAddress, Password, PasswordConfirm, Presentation) VALUES (?, ?, ?, ?, ?, ?)", [companyUser.companyName, companyUser.phone, companyUser.companyemail, companyUser.password, companyUser.passwordconfirm, companyUser.presentation]);
        res.send({ message: 'Company created successfully', insertId: Number(result.insertId) });
    } catch (err) {
        throw err;
    }
}

exports.loginCompany = async (req, res) => {
    let {companyemail, password} = req.body;
    const regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/;

    if(!companyemail || !regexMail.test(companyemail) || !password) {
        res.status(400).json({"message" : "authentification error"})
    }

    try {
        // Retrieve the password used in the database
        const query = await pool.query("select Password, EmailAddress, CompanyName, Phone, AdvertisementCount, Presentation from Companies WHERE EmailAddress = ?", [companyemail])
        if (query.length === 1) {
            const hashedPassword = query[0].Password; // the password is hashed

            const validPassword = await bcrypt.compare(password, hashedPassword); // we compare the hashedpassword with the password used
            if (validPassword) {
                const token = jwt.sign({
                    email: query[0].EmailAddress,
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

exports.getOneCompany = async (req, res) => {
    const email = req.auth.email
    try {
        const result = await pool.query("select CompanyName, EmailAddress, Phone, AdvertisementCount, Presentation from Companies WHERE EmailAddress = ?", [email]);
        console.log(result)
        res.send(result);
    } catch (err) {
        throw err;
    }
}