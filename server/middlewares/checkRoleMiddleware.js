const jwt = require('jsonwebtoken');

module.exports = function(role) {
  return function(req, res, next) {
    if (req.method === 'OPTIONS') {
      next();
    } 
    try{
      const token = req.headers.authorization.split(' ')[1];
      console.log(token);
      
      if (!token) {
        return res.status(401).json({message: 'checkRoleMiddleware/not authorized!'});
      }
  
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      if(decoded.role !== role) {
        return res.status(403).json({message: 'checkRoleMiddleware/You have no permission!'});
      }
      req.user = decoded;
      next();
    } 
    catch(err) {
      res.status(401).json({message: 'checkRoleMiddleware/not authorized!'});
    }
  }
}