const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'MonkeyDLuffy';

const fetchuser = (req, res, next) => {
    //Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ error: 'You haven\'t entered token' });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;

        next();
    } catch (error) {
        return res.status(401).json({ error: 'Please authenticate with valid token' });
    }


}

module.exports = fetchuser;