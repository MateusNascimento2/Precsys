const DownloadFileRepository = require('../repositories/DownloadFileRepository');

class DownloadFileController {
  async download(req, res) {
    const { path, filename } = req.params;
    const remotePath = `/testeapi.precsys.app.br/storage/app/${path}/${filename}`;

    try {
      const stream = await DownloadFileRepository.getFileStream(remotePath);

      res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
      stream.pipe(res);
      stream.on('error', (err) => {
        console.error('Error sending file:', err);
        res.status(500).send('Error sending file');
      });
    } catch (error) {
      res.status(500).json({ message: 'Error downloading file' });
    }
  }
}

module.exports = new DownloadFileController();
