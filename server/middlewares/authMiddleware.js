const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  if (req.method === 'OPTIONS') {
    next();
  } 
  try{
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    
    if (!token) {
      return res.status(401).json({message: 'authMiddleware/not authorized!'});
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decoded;
    next();
  } 
  catch(err) {
    res.status(401).json({message: 'authMiddleware/not authorized!'});
  }
}