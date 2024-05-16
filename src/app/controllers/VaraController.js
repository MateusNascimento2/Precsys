const VaraRepository = require('../repositories/VaraRepository');

class VaraController {
  async index(request, response) {
    const varas = await VaraRepository.findAll();

    return response.json(varas);
  }
}

module.exports = new VaraController();
