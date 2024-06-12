const LogsRepository = require('../repositories/LogsRepository');

class LogsController {
  async index(request, response) {
    const loginLogs = await LogsRepository.findAll();

    return response.json(loginLogs);
  }
}

module.exports = new LogsController();
