const db = require('../../database/index');

class VaraRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM precsysa_sv.vara');

    return rows;
  }
}

module.exports = new VaraRepository();
