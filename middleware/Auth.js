const jwt = require('jsonwebtoken');
const { responseFailed } = require('../utils/response');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return responseFailed(401, "Maaf silahkan masukan token", res);
    }
  
    jwt.verify(token, 'SECRET_KEY', { algorithms: ['HS256'] }, (err, user) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return responseFailed(403, "Masa token habis", res);
        }
        return responseFailed(403, "Token salah", res);
      }
      req.user = user;
      next();
    });
  }
  
  module.exports = authenticateToken;
  