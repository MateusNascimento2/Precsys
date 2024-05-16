const db = require('../../database/index');

class EscreventeRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM precsysa_sv.escreventes');

    return rows;
  }
}

module.exports = new EscreventeRepository();
