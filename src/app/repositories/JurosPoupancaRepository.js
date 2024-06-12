const db = require('../../database/index');

class JurosPoupancaRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM precsysapp_demo.jurosPoupanca');

    return rows;
  }
}

module.exports = new JurosPoupancaRepository();
