const NaturezaRepository = require('../repositories/NaturezaRepository');

class NaturezaController {
  async index(request, response) {
    const natureza = await NaturezaRepository.findAll();

    return response.json(natureza);
  }
}

module.exports = new NaturezaController();
