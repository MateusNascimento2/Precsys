const JurosPoupancaRepository = require('../repositories/JurosPoupancaRepository');

class JurosPoupancaController {
  async index(request, response) {
    const fatores = await JurosPoupancaRepository.findAll();

    return response.json(fatores);
  }
}

module.exports = new JurosPoupancaController();
