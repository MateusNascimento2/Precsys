const CessoesRepository = require('../repositories/CessoesRepository');
const CessionariosRepository = require('../repositories/CessionariosRepository');

class CessaoController {
  async index(request, response) {
    const cessoes = await CessoesRepository.findAll();

    return response.json(cessoes);
  }

  async show(request, response) {
    const { id } = request.params;
    const userId = request.header('UserID');
    const isAdmin = request.header('isAdmin');

    const cessionarios = await CessionariosRepository.findAll();

    // eslint-disable-next-line max-len
    const cessoesEmQueOUsuarioEsta = cessionarios.filter((cessionario) => cessionario.user_id === userId);
    const IDsDasCessoesDoUsuario = cessoesEmQueOUsuarioEsta.map((cessao) => cessao.cessao_id);

    if (isAdmin === '1') {
      const precatorio = await CessoesRepository.findById(id);

      if (!precatorio) {
        return response.status(404).json({ error: 'Precatório não encontrado' });
      }

      return response.json(precatorio);
    }

    if (IDsDasCessoesDoUsuario.includes(id) && isAdmin === '0') {
      const precatorio = await CessoesRepository.findById(id);

      if (!precatorio) {
        return response.status(404).json({ error: 'Precatório não encontrado' });
      }

      return response.json(precatorio);
    }

    return response.status(401).json({ error: 'Você não possui acesso a essa cessão' });
  }

  async store(request, response) {
    // criar uma nova cessão

    console.log(request.body);

    const {
      precatorio, processo, cedente, vara, ente, ano, natureza, empresa,
      dataCessao, repComercial, escrevente, juridico, status,
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
      status,
    });

    return response.status(201).json(cessao);
  }

  async update(request, response) {
    // Editar uma cessao
    const { id } = request.params;

    const idCessao = String(id);

    const {
      // eslint-disable-next-line max-len
      precatorioEditado, processoEditado, cedenteEditado, varaEditado, enteEditado, anoEditado, naturezaEditado, empresaEditado,
      dataCessaoEditado, repComercialEditado, escreventeEditado, juridicoEditado,
    } = request.body;

    const cessaoExiste = await CessoesRepository.findById(idCessao);

    if (!cessaoExiste) {
      return response.status(404).json({ error: 'Cessão não encontrada' });
    }

    if (!precatorioEditado) {
      return response.status(400).json({ error: 'Número do precatório faltando' });
    }

    if (!processoEditado) {
      return response.status(400).json({ error: 'Número do processo faltando' });
    }

    if (!cedenteEditado) {
      return response.status(400).json({ error: 'Nome do cedente faltando' });
    }

    if (!varaEditado) {
      return response.status(400).json({ error: 'Vara faltando' });
    }

    if (!enteEditado) {
      return response.status(400).json({ error: 'Ente faltando' });
    }

    if (!anoEditado) {
      return response.status(400).json({ error: 'Ano faltando' });
    }

    if (!naturezaEditado) {
      return response.status(400).json({ error: 'Natureza faltando' });
    }

    if (!empresaEditado) {
      return response.status(400).json({ error: 'Empresa faltando' });
    }

    if (!dataCessaoEditado) {
      return response.status(400).json({ error: 'Data da cessão faltando' });
    }

    if (!repComercialEditado) {
      return response.status(400).json({ error: 'Representante Comercial faltando' });
    }

    if (!escreventeEditado) {
      return response.status(400).json({ error: 'Nome do escrevente faltando' });
    }

    if (!juridicoEditado) {
      return response.status(400).json({ error: 'Nome do juridico faltando' });
    }

    const cessao = await CessoesRepository.update(idCessao, {
      precatorioEditado,
      processoEditado,
      cedenteEditado,
      varaEditado,
      enteEditado,
      anoEditado,
      naturezaEditado,
      empresaEditado,
      dataCessaoEditado,
      repComercialEditado,
      escreventeEditado,
      juridicoEditado,
    });

    return response.status(200).json(cessao);
  }

  async delete(request, response) {
    // Deletar uma cessao
    const { id } = request.params;

    await CessoesRepository.delete(id);
    return response.sendStatus(204);
  }
}

module.exports = new CessaoController();
