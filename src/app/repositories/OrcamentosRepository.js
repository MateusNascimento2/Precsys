const db = require('../../database/index');

class OrcamentosRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM precsysa_sv.orcamentos');
    return rows;
  }
}

module.exports = new OrcamentosRepository();
