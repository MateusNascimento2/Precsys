const db = require('../../database/index');

class StatusRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM precsysa_sv.status');
    return rows;
  }
}

module.exports = new StatusRepository();
