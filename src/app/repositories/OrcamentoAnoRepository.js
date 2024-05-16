const db = require('../../database/index');

class OrcamentoAnoRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM precsysa_sv.orcamentos_anos');
    return rows;
  }
}

module.exports = new OrcamentoAnoRepository();
