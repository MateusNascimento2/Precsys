const db = require('../../database/index');

class LogsRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM precsysapp_demo.logs_login ORDER BY logs_login.id DESC');

    return rows;
  }
}

module.exports = new LogsRepository();
