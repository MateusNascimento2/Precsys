const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const createTokens = (user) => {
  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET);

  return accessToken;
};

const validateToken = (request, response, next) => {
  const acessToken = request.cookies['access-token'];

  if (!acessToken) {
    return response.status(400).json({ error: 'User not authenticated' });
  }

  try {
    const validToken = jwt.verify(acessToken, process.env.ACCESS_TOKEN_SECRET);
    if (validToken) {
      request.user = validToken.user;
      return next();
    }
  } catch (err) {
    return response.status(400).json({ error: err });
  }
};

const isActive = (request, response, next) => {
  if (request.user && request.user.ativo) {
    console.log('User is active');
    return next();
  }

  return response.status(403).json({ error: 'Permission denied. User is not Active!' });
};

const isAdmin = (request, response, next) => {
  if (request.user && request.user.admin) {
    console.log(`É admin:${request.user.admin}`);
    return next();
  }
  return response.status(403).json({ error: 'Permission denied. User is not an admin.' });
};

module.exports = {
  createTokens, validateToken, isAdmin, isActive,
};
