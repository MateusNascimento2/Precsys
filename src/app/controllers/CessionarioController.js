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

  async update(request, response) {
    // Editar uma cessao
    const { id } = request.params;

    const {
      // eslint-disable-next-line max-len
      valorPagoEditado, comissaoEditado, percentualEditado, expectativaEditado, cessionarioEditado, obsEditado, assinaturaEditado, expedidoEditado, recebidoEditado,
    } = request.body;

    const cessionarioExiste = await CessionariosRepository.findById(id);

    if (!cessionarioExiste) {
      return response.status(404).json({ error: 'Cessionário não encontrada' });
    }

    if (!valorPagoEditado) {
      return response.status(400).json({ error: 'Valor pago faltando' });
    }

    if (!comissaoEditado) {
      return response.status(400).json({ error: 'Comissão faltando' });
    }

    if (!percentualEditado) {
      return response.status(400).json({ error: 'Percentual faltando' });
    }

    if (!expectativaEditado) {
      return response.status(400).json({ error: 'Expectativa faltando' });
    }

    if (!cessionarioEditado) {
      return response.status(400).json({ error: 'Cessionário faltando' });
    }

    const cessionario = await CessionariosRepository.update(id, {
      // eslint-disable-next-line max-len
      valorPagoEditado, comissaoEditado, percentualEditado, expectativaEditado, cessionarioEditado, obsEditado, assinaturaEditado, expedidoEditado, recebidoEditado,
    });

    return response.status(200).json(cessionario);
  }

  async delete(request, response) {
    // Deletar uma cessao
    const { id } = request.params;

    await CessionariosRepository.delete(id);
    return response.sendStatus(204);
  }
}

module.exports = new CessionarioController();
