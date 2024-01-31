const db = require('../../database/index');

class CessionsRepository {
  async findAll() {
    const rows = db.query('SELECT * FROM precsysa_sv.cessoes');
    return rows;
  }
}

module.exports = new CessionsRepository();
