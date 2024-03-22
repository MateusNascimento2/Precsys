const OrcamentosRepository = require('../repositories/OrcamentosRepository');

class OrcamentosController {
  async index(request, response) {
    const orcamentos = await OrcamentosRepository.findAll();

    return response.json(orcamentos);
  }
}

module.exports = new OrcamentosController();
