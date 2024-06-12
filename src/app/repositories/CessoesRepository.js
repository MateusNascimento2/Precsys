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

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM precsysapp_demo.cessoes WHERE id = ?', [id]);
    return deleteOp;
  }
}

module.exports = new CessoesRepository();
