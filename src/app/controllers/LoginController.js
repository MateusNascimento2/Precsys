const { list } = require('@vercel/blob');

const LoginRepository = require('../repositories/LoginRepository');
const { createTokens } = require('../../JWT');

// https://na8wxsbombeghbmf.public.blob.vercel-storage.com/avatar/150-1-UpicXw2rjKTuzYPqtLS2LpWDXjtZvn.jpg

class LoginController {
  render(request, response) {
    response.render('index');
  }

  async checkCpfCnpj(request, response) {
    const { blobs } = await list();
    // console.log({ blobs });

    const { cpfcnpj } = request.body;

    const isUserCPFRegistered = await LoginRepository.IsCpfCnpjRegistered(cpfcnpj);

    if (!isUserCPFRegistered) {
      response.status(401).json({ error: 'Invalid CPF/CNPJ' });
    }

    const user = isUserCPFRegistered;
    const userPhoto = user.foto;
    const userName = user.nome;

    const userPhotoObj = blobs.find((blob) => blob.pathname === userPhoto);
    console.log(userPhotoObj);

    if (!userPhotoObj) {
      return response.json({ photoUrl: null, userName });
    }

    const { url } = userPhotoObj;
    const photoUrl = url;
    console.log(photoUrl);
    response.json({ photoUrl, userName });
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

    response.setHeader('Set-Cookie', `access-token=${accessToken}; Path=/; HttpOnly; Max-Age=295400; Secure; SameSite=None`);

    console.log('Login Successful');
    response.json('Logged In');
  }
}

module.exports = new LoginController();
