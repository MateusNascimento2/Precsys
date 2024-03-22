const EmpresaRepository = require('../repositories/EmpresaRepository');

class EmpresaController {
  async index(request, response) {
    const empresas = await EmpresaRepository.findAll();

    return response.json(empresas);
  }
}

module.exports = new EmpresaController();
