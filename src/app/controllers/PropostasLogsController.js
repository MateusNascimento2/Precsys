const PropostasLogsRepository = require('../repositories/PropostasLogsRepository');

class PropostasLogsController {
  async index(request, response) {
    const propostasLogs = await PropostasLogsRepository.findAll();

    return response.json(propostasLogs);
  }
}

module.exports = new PropostasLogsController();
