const db = require('../../database/index');

class JuridicosRepository {
  async findAll() {
    const rows = await db.query(`
    SELECT * FROM precsysa_sv.juridicos`);

    return rows;
  }
}

module.exports = new JuridicosRepository();
