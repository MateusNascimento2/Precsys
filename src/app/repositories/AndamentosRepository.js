const db = require('../../database/index');

class AndamentosRepository {
  async findAll(precatorio) {
    const rows = await db.query(`SELECT *
    FROM precsysa_sv.andamentos_processo
    WHERE precatorio = ?;
    `, [precatorio]);

    return rows;
  }
}

module.exports = new AndamentosRepository();
