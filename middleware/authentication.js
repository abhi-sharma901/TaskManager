const jwt = require('jsonwebtoken');
const User = require('../models/User');


const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        //Bearer JWT Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);// decoded has the id field of a user signed by the jwt key
        const user = await User.findOne({//here we find the user withthe decoded id
            _id: decoded._id,
        })

        if (!user) {//if not found
            throw new Error('Unable to login , invalid credentials');
        }

        req.user = user;// if found then we add the user found to the req for the api
        req.token = token;
        //calling the next api after the middleware
        next();

    }
    catch (error) { 
        res.status(401).send({ error: error.message});
    }
}

module.exports = authenticate;