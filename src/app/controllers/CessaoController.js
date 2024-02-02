const CessoesRepository = require('../repositories/CessoesRepository');

class CessionController {
  async index(request, response) {
    const cessoes = await CessoesRepository.findAll();

    return response.json(cessoes);
  }
}

module.exports = new CessionController();
