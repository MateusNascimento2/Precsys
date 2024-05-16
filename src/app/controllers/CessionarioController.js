const CessionariosRepository = require('../repositories/CessionariosRepository');

class CessionarioController {
  async index(request, response) {
    const cessionarios = await CessionariosRepository.findAll();

    return response.json(cessionarios);
  }

/*   async store(request, response) {
    const {
      cessionario, valorPago, comissao, percentual, expectativa, obs,
      assinatura, expedido, recebido,
    } = request.body;

  } */
}

module.exports = new CessionarioController();
