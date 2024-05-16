const CessoesRepository = require('../repositories/CessoesRepository');

class CessaoController {
  async index(request, response) {
    const cessoes = await CessoesRepository.findAll();

    return response.json(cessoes);
  }

  async show(request, response) {
    const { id } = request.params;

    const precatorio = await CessoesRepository.findById(id);

    if (!precatorio) {
      return response.status(404).json({ error: 'Precatório não encontrado' });
    }

    return response.json(precatorio);
  }

  async store(request, response) {
    // criar uma nova cessão
    const {
      precatorio, processo, cedente, vara, ente, ano, natureza, empresa,
      dataCessao, repComercial, escrevente, juridico,
    } = request.body;

    if (!precatorio) {
      return response.status(400).json({ error: 'Número do precatório faltando' });
    }

    if (!processo) {
      return response.status(400).json({ error: 'Número do processo faltando' });
    }

    if (!cedente) {
      return response.status(400).json({ error: 'Nome do cedente faltando' });
    }

    if (!vara) {
      return response.status(400).json({ error: 'Vara faltando' });
    }

    if (!ente) {
      return response.status(400).json({ error: 'Ente faltando' });
    }

    if (!ano) {
      return response.status(400).json({ error: 'Ano faltando' });
    }

    if (!natureza) {
      return response.status(400).json({ error: 'Natureza faltando' });
    }

    if (!empresa) {
      return response.status(400).json({ error: 'Empresa faltando' });
    }

    if (!dataCessao) {
      return response.status(400).json({ error: 'Data da cessão faltando' });
    }

    if (!repComercial) {
      return response.status(400).json({ error: 'Representante Comercial faltando' });
    }

    if (!escrevente) {
      return response.status(400).json({ error: 'Nome do escrevente faltando' });
    }

    const cessao = await CessoesRepository.create({
      precatorio,
      processo,
      cedente,
      vara,
      ente,
      ano,
      natureza,
      empresa,
      dataCessao,
      repComercial,
      escrevente,
      juridico,
    });

    return response.status(201).json(cessao);
  }
}

module.exports = new CessaoController();
