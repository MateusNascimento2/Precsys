const SelicAcumuladoJFRepository = require('../repositories/SelicAcumuladoJFRepository');

class SelicAcumuladoJFController {
  async index(request, response) {
    const fatores = await SelicAcumuladoJFRepository.findAll();

    return response.json(fatores);
  }
}

module.exports = new SelicAcumuladoJFController();
