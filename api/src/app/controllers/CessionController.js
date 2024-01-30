const CessionsRepository = require('../repositories/CessionsRepository');

class CessionController {
  async index(request, response) {
    const cessions = await CessionsRepository.findAll();

    return response.json(cessions);
  }
}

module.exports = new CessionController();
