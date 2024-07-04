const ftp = require('basic-ftp');
const { PassThrough } = require('stream');

class DownloadFileRepository {
  async getFileStream(remotePath) {
    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
      await client.access({
        host: '149.56.27.121',
        port: 21,
        user: 'precsysapp',
        password: 'ZqJZ1nNT;R]M',
        secure: false,
      });
      console.log('FTP client connected');

      const stream = new PassThrough();
      client.downloadTo(stream, remotePath)
        .then(() => {
          client.close();
        })
        .catch((err) => {
          console.error('FTP client error:', err);
          client.close();
          throw err;
        });

      return stream;
    } catch (err) {
      console.error('FTP client error:', err);
      throw err;
    }
  }
}

module.exports = new DownloadFileRepository();
