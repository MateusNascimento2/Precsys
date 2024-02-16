const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const createAcessToken = (user) => {
  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '300s' });
  console.log(`AcessToken: ${accessToken}`);

  return accessToken;
};

const createRefreshToken = (user) => {
  const refreshToken = jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
  console.log(`RefreshToken: ${refreshToken}`);

  return refreshToken;
};

const validateToken = (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ error: 'User not authenticated' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const validToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (validToken) {
      request.user = validToken.user;
      return next();
    }
  } catch (err) {
    return response.status(403).json({ auth: false, error: err });
  }
};

const validateRefreshToken = (request, response, refreshToken, foundUser) => {
  try {
    const validRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (validRefreshToken) {
      const acessToken = jwt.sign({ foundUser }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '300s' });
      response.json({ acessToken });
    }
  } catch (err) {
    return response.sendStatus(403);
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
  createAcessToken, createRefreshToken, validateToken, validateRefreshToken, isAdmin, isActive,
};
