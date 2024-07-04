const UploadFileRepository = require('../repositories/UploadFileRepository');

class UploadFileController {
  async upload(request, response) {
    try {
      const { files } = request;
      // console.log(files);
      const result = await UploadFileRepository.uploadFiles(files);
      response.status(200).send(result);
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: 'Erro ao enviar o arquivo' });
    }
  }
}

module.exports = new UploadFileController();
