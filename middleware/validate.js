const jwt = require("jsonwebtoken"); 


const validateLogin = (req, res, next) => {
    const { access_token } = req.headers;

    try {
      const token = access_token;
      const decode = jwt.verify(token,process.env.JWT_Secret);
      const {username, userId} = decode;
      req.username = username;
      req.userId = userId;
      next();
    } catch (error) {
      next("Authentication Failure!");
    }
   
  };

  module.exports = {validateLogin};