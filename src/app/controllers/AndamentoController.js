const AndamentosRepository = require('../repositories/AndamentosRepository');

class AndamentoController {
  async index(request, response) {
    const { precatorio } = request.params;
    const andamentos = await AndamentosRepository.findAll(precatorio);

    return response.json(andamentos);
  }
}

module.exports = new AndamentoController();
