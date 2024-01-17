const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const TOKEN = process.env.TOKEN

module.exports = (req,res, next) => {
    try {
        const token = (req.headers.authorization || '').split(' ')[1] 
        const decodedToken = jwt.verify(token, TOKEN);
        const email = decodedToken.email;
        req.auth = {
            email: email
        };
        next();
    } catch(error) {
        res.status(403).json({ message : 'unauthorized request' })
    }
}