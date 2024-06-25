const db = require('../../database/index');

class PropostasLogsRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM precsysapp_demo.propostas ORDER BY propostas.id DESC');

    return rows;
  }
}

module.exports = new PropostasLogsRepository();
