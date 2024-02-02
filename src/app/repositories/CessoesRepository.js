const db = require('../../database/index');

class CessoesRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM precsysa_sv.cessoes');
    return rows;
  }
}

module.exports = new CessoesRepository();
