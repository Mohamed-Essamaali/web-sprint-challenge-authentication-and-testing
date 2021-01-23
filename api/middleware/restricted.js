const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  // next();
  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
 try{
   const token = req.cookies.token

   if(!token){
     return res.status(401).json({message: "token required"})
   }
   
   jwt.verify(token,"terces ti peek, efas ti peek",(err,decoded)=>{
     if(err){
      return res.status(401).json({
        message: "token invalid",
      })
     }
     req.token = decoded
    next()
   })

 }
 catch(err){next(err)}

};
