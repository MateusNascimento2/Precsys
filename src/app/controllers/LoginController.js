const LoginRepository = require('../repositories/LoginRepository');
const { createTokens } = require('../../JWT');

class LoginController {
  render(request, response) {
    response.render('index');
  }

  async login(request, response) {
    console.log(request.body);

    const { cpfcnpj, password } = request.body;

    const isUserRegistered = await LoginRepository.IsRegistered(cpfcnpj, password);

    if (!isUserRegistered) {
      response.status(401).json({ error: 'Invalid CPF/CNPJ or Password' });
      return;
    }

    const user = isUserRegistered;
    const accessToken = createTokens(user);
    console.log(accessToken);

    response.setHeader('Set-Cookie', `access-token=${accessToken}; Path=/; HttpOnly; SameSite=Strict; Max-Age=295400`);

    console.log('Login Successful');
    response.json('Logged In');
  }
}

module.exports = new LoginController();
