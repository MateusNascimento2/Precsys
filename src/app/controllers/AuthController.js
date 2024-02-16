const { list } = require('@vercel/blob');

const LoginRepository = require('../repositories/AuthRepository');
const RefreshTokenRepository = require('../repositories/RefreshTokenRepository');
const { createAcessToken, createRefreshToken } = require('../../JWT');

// https://na8wxsbombeghbmf.public.blob.vercel-storage.com/avatar/150-1-UpicXw2rjKTuzYPqtLS2LpWDXjtZvn.jpg

class AuthController {
  async checkCpfCnpj(request, response) {
    const { cpfcnpj } = request.body;

    const isUserCPFRegistered = await LoginRepository.IsCpfCnpjRegistered(cpfcnpj);

    if (!isUserCPFRegistered) {
      response.status(401).json({ error: 'CPF/CNPJ inválido.', className: 'py-3 px-4 rounded border border-red-600 bg-red-200 text-red-700' });
      return;
    }

    if (!isUserCPFRegistered.ativo) {
      response.status(401).json({ error: 'Usuário desativado.', className: 'py-3 px-4 rounded border border-yellow-600 bg-yellow-100 text-yellow-700' });
      return;
    }

    const { blobs } = await list();
    console.log({ blobs });

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
      response.status(401).json({ error: 'Senha inválida.' });
      return;
    }

    const user = isUserRegistered;
    const userWithoutRefreshToken = { ...user };
    delete userWithoutRefreshToken.refreshToken;
    const accessToken = createAcessToken(userWithoutRefreshToken);
    const refreshToken = createRefreshToken(userWithoutRefreshToken);

    const RefreshtokenRegistered = await RefreshTokenRepository.store(user.id, refreshToken);
    console.log(RefreshtokenRegistered);

    // console.log(currentUser);
    // botar o refreshToken no banco de dados junto com o usuario

    response.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    response.json({ token: accessToken, result: user });

    // eslint-disable-next-line max-len
    // response.setHeader('Set-Cookie', `access-token=${accessToken}; Path=/; HttpOnly; Max-Age=295400; Secure; SameSite=None`);

    console.log('Login Successful');
  }
}

module.exports = new AuthController();
