const UsersRepository = require('../repositories/UsersRepository');

const { validateRefreshToken } = require('../../JWT');

class RefreshTokenController {
  async handleRefreshToken(request, response) {
    const { cookies } = request;

    if (!cookies?.refreshToken) {
      response.sendStatus(401);
      return;
    }

    console.log(cookies.refreshToken);
    const { refreshToken } = cookies;

    const usersDB = await UsersRepository.findAll();
    const foundUser = usersDB.find((person) => person.refreshToken === refreshToken);

    if (!foundUser) {
      return response.sendStatus(403);
    }

    validateRefreshToken(request, response, refreshToken, foundUser);
  }
}

module.exports = new RefreshTokenController();
