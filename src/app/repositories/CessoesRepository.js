const db = require('../../database/index');

class CessoesRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM precsysapp_demo.cessoes ORDER BY cessoes.id DESC');
    return rows;
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM precsysapp_demo.cessoes WHERE cessoes.id = ? ', [id]);
    return row;
  }

  async create({
    precatorio, processo, cedente, vara, ente, ano, natureza, empresa,
    dataCessao, repComercial, escrevente, juridico, status,
  }) {
    const row = await db.query('INSERT INTO precsysapp_demo.cessoes(precatorio, ente_id, ano, natureza, processo, vara_processo, cedente, data_cessao, empresa_id, escrevente_id, juridico_id, tele_id, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [precatorio, ente, ano, natureza, processo, vara, cedente, dataCessao, empresa, escrevente, juridico, repComercial, status]);

    return row;
  }

  async update(id, {
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
  }) {
    const row = await db.query(`
    UPDATE precsysapp_demo.cessoes
    SET precatorio = ?, processo = ?, cedente = ?, vara_processo = ?, ente_id = ?, ano = ?, natureza = ?, empresa_id = ?, data_cessao = ?, tele_id = ?, escrevente_id = ?, juridico_id = ?
    WHERE id = ?
    `, [precatorioEditado,
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
      juridicoEditado, id]);

    return row;
  }

  async delete(id) {
    // Deleta a cessão específica
    const deleteOp = await db.query('DELETE FROM precsysapp_demo.cessoes WHERE id = ?', [id]);

    // Deleta os cessionários associados à cessão
    const deleteCessionario = await db.query('DELETE FROM precsysapp_demo.cessionarios WHERE cessao_id = ?', [id]);

    // Retorna ambos os resultados (opcionalmente, pode retornar apenas o necessário)
    return {
      deleteOp,
      deleteCessionario,
    };
  }
}

module.exports = new CessoesRepository();
