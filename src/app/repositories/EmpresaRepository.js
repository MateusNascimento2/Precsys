const db = require('../../database/index');

class EmpresaRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM precsysa_sv.empresas');
    return rows;
  }
}

module.exports = new EmpresaRepository();
