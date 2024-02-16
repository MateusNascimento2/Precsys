const UsersRepository = require('../repositories/UsersRepository');
const RefreshTokenRepository = require('../repositories/RefreshTokenRepository');

class LogoutController {
  async handleLogout(request, response) {
    // On client, also delete the AcessToken
    const { cookies } = request;

    if (!cookies?.refreshToken) {
      response.sendStatus(204);
      return;
    }

    console.log(cookies.refreshToken);
    let { refreshToken } = cookies;

    const usersDB = await UsersRepository.findAll();
    const foundUser = usersDB.find((person) => person.refreshToken === refreshToken);

    if (!foundUser) {
      response.clearCookie('refreshtoken', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      return response.sendStatus(204);
    }

    await RefreshTokenRepository.store(foundUser.id, refreshToken = '');

    response.clearCookie('refreshtoken', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    response.sendStatus(204);
  }
}

module.exports = new LogoutController();
