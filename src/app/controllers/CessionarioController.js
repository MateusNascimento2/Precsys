const CessionariosRepository = require('../repositories/CessionariosRepository');

class CessionarioController {
  async index(request, response) {
    const cessionarios = await CessionariosRepository.findAll();

    return response.json(cessionarios);
  }

  async store(request, response) {
    const {
      id_cessao, cessionario, valorPago, comissao, percentual, expectativa, obs,
      assinatura, expedido, recebido,
    } = request.body;

    if (!id_cessao) {
      return response.status(404).json({ error: 'Id da cessão não encontrado' });
    }

    if (!cessionario) {
      return response.status(404).json({ error: 'Nome do cessionário faltando' });
    }

    const cessionarios = await CessionariosRepository.create({
      id_cessao,
      cessionario,
      valorPago,
      comissao,
      percentual,
      expectativa,
      obs,
      assinatura,
      expedido,
      recebido,
    });

    return response.status(201).json(cessionarios);
  }
}

module.exports = new CessionarioController();
