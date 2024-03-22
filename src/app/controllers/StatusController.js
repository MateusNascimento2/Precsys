const StatusRepository = require('../repositories/StatusRepository');

class StatusController {
  async index(request, response) {
    const status = await StatusRepository.findAll();

    return response.json(status);
  }
}

module.exports = new StatusController();
