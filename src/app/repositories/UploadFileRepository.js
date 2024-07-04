const ftp = require('basic-ftp');
const { Readable } = require('stream');

class UploadFileRepository {
  async uploadFiles(files) {
    const client = new ftp.Client();
    client.ftp.verbose = true; // Ativar logs detalhados para depuração

    try {
      await client.access({
        host: '149.56.27.121',
        port: 21,
        user: 'precsysapp',
        password: 'ZqJZ1nNT;R]M',
        secure: false, // Usar FTP não seguro
      });
      console.log('FTP client connected');

      const bufferToStream = (buffer) => {
        const readable = new Readable();
        // eslint-disable-next-line no-underscore-dangle
        readable._read = () => {}; // _read é necessário, mas podemos deixá-lo vazio
        readable.push(buffer);
        readable.push(null);
        return readable;
      };

      const uploadFile = async (file, path) => {
        console.log(`Uploading ${file.originalname} to ${path}`);
        const readableStream = bufferToStream(file.buffer); // Transformar o buffer em um stream
        await client.uploadFrom(readableStream, path + file.originalname);
        console.log(`File ${file.originalname} uploaded successfully to ${path}`);
      };

      await uploadFile(files.requisitorio[0], '/testeapi.precsys.app.br/storage/app/cessoes_requisitorios/');
      await uploadFile(files.escritura[0], '/testeapi.precsys.app.br/storage/app/cessoes_escrituras/');

      client.close();
      console.log('FTP client connection closed');
    } catch (err) {
      console.error('FTP client error:', err);
    }
  }
}

module.exports = new UploadFileRepository();
