const db = require('../../database/index');

class TeleRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM precsysa_sv.teles');

    return rows;
  }
}

module.exports = new TeleRepository();
