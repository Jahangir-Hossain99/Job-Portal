const jwt = require('jsonwebtoken');

const authenticateToken = async(req, res, next) => {
  try {
    const token = req.cookies.Authorization;
    if(!token){
      res.redirect('/jobs/signin')
      
    }
    const decoded = jwt.verify(token,process.env.JWT_Secret);
    ;
    if(!decoded){
      res.status(500).json({ message: 'Please logged in first' });
    }

    
     req.body.userId = decoded.id;
    next();
    
  } catch (error) {
    return next(error);
  }
};

const islogout = async(req,res,next)=>{
  try {
    const accessToken = req.cookies['Authorization'];
   if(accessToken){
    throw "Already looged out";
   }else{
    next();
   }
   
    
  } catch (error) {
    return next(error);
  }
}

module.exports = { authenticateToken , islogout  };