const jwt = require("jsonwebtoken");

const Autherization = async(req, res, next) => {
  const token = req.headers.autherization;
  if (!token) {
    res.status(403).send({ err: "unAutherized" });
  } else {
    console.log("token", token);
    const verifyuser =await jwt.verify(token, process.env.SECRETKEY);
    console.log("verify",verifyuser)
    res.user = verifyuser.iat, 
    res.id = verifyuser.id;
    
  }
  next();
};
module.exports = Autherization;
