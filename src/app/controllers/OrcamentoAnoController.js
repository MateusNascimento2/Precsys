const OrcamentoAnoRepository = require('../repositories/OrcamentoAnoRepository');

class OrcamentoAnoController {
  async index(request, response) {
    const orcamentosAnos = await OrcamentoAnoRepository.findAll();

    return response.json(orcamentosAnos);
  }
}

module.exports = new OrcamentoAnoController();
