const CessionariosRepository = require('../repositories/CessionariosRepository');

class CessionarioController {
  async index(request, response) {
    const cessionarios = await CessionariosRepository.findAll();

    return response.json(cessionarios);
  }
}

module.exports = new CessionarioController();
