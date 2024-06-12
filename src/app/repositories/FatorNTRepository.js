const db = require('../../database/index');

class FatorNTRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM precsysapp_demo.fatorNT');

    return rows;
  }
}

module.exports = new FatorNTRepository();
