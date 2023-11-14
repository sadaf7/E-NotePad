const jwt = require('jsonwebtoken');
const JWT_SEC = "ujhdjsahdsa25";

const generateToken =(id)=>{
    return jwt.sign({ id }, JWT_SEC, { expiresIn: '30d' });
}

module.exports = generateToken;