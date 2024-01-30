const db = require('../../database/index');

class CessionsRepository {
  async findAll() {
    const rows = db.query('SELECT * FROM precsys_teste.cessoes');
    return rows;
  }
}

module.exports = new CessionsRepository();
