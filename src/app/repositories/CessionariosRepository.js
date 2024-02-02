const db = require('../../database/index');

class CessionariosRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM precsysa_sv.cessionarios');

    return rows;
  }
}

module.exports = new CessionariosRepository();
