const db = require('../../database/index');

class NaturezaRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM precsysa_sv.natureza');
    return rows;
  }
}

module.exports = new NaturezaRepository();
