const jwt = require("jsonwebtoken"); 


const validateLogin = (req, res, next) => {
    const auth= req.headers['access_token'];

    try {
      const token = auth;
      const decode = jwt.verify(token,process.env.JWT_Secret);
      
      const {email, id} = decode;
    
      req.email = email;
      req.userId = id;
      next();
    } catch (error) {
      console.log(error);
      next("Authentication Failure!");
    }
   
  };

  module.exports = validateLogin;