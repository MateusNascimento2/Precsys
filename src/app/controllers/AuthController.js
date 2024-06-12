const { list } = require('@vercel/blob');

const requestIp = require('request-ip');
const LoginRepository = require('../repositories/AuthRepository');
const RefreshTokenRepository = require('../repositories/RefreshTokenRepository');
const { createAcessToken, createRefreshToken } = require('../../JWT');
const AuthRepository = require('../repositories/AuthRepository');

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
    const clientIp = requestIp.getClientIp(request);

    function getCurrentDateTime() {
      const date = new Date();

      // Formatar a data e hora para o formato desejado usando toLocaleString
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'America/Sao_Paulo', // Define o fuso horário para São Paulo, Brasil
      };

      const formattedDate = date.toLocaleString('pt-BR', options);

      // Formatar a string para "YYYY-MM-DD HH:mm:ss"
      const [datePart, timePart] = formattedDate.split(' ');
      const [day, month, year] = datePart.split('/');
      return `${year}-${month}-${day} ${timePart}`;
    }

    // Exemplo de uso
    const currentDateTime = getCurrentDateTime();

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

    await AuthRepository.clientLog(user.id, clientIp, currentDateTime);

    // console.log(currentUser);

    // eslint-disable-next-line object-curly-newline
    response.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
    response.json({ accessToken, user });

    console.log('Login Successful');
  }
}

module.exports = new AuthController();
