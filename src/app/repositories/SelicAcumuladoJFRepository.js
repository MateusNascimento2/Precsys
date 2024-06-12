const db = require('../../database/index');

class SelicAcumuladoJFRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM precsysapp_demo.selicAcumuladoJF');

    return rows;
  }
}

module.exports = new SelicAcumuladoJFRepository();
