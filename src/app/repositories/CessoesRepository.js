const db = require('../../database/index');

class CessoesRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM precsysa_sv.cessoes');
    return rows;
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM precsysa_sv.cessoes WHERE cessoes.id = ? ', [id]);
    return row;
  }

  async create({
    precatorio, processo, cedente, vara, ente, ano, natureza, empresa,
    dataCessao, repComercial, escrevente, juridico,
  }) {
    const row = await db.query('INSERT INTO precsysa_sv.cessoes(precatorio, ente_id, ano, natureza, processo, vara_processo, cedente, data_cessao, empresa_id, escrevente_id, juridico_id, tele_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [precatorio, ente, ano, natureza, processo, vara, cedente, dataCessao, empresa, escrevente, juridico, repComercial]);

    return row;
  }
}

module.exports = new CessoesRepository();
