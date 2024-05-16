const JuridicosRepository = require('../repositories/JuridicosRepository');

class JuridicoController {
  async index(request, response) {
    // Lista todos os juridicos
    const juridicos = await JuridicosRepository.findAll();

    return response.json(juridicos);
  }
}

module.exports = new JuridicoController();
