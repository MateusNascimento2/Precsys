const db = require('../../database/index');

class UsersRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
    SELECT * FROM precsysa_sv.users
    ORDER BY users.nome ${direction}
    `);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM precsysa_sv.users WHERE users.id = ?', [id]);
    return row;
  }

  // Mudar depois para findByCPFCNPJ
  async findByCPFCNPJ(cpfcnpj) {
    const [row] = await db.query('SELECT * FROM precsysa_sv.users WHERE cpfcnpj = ?', [cpfcnpj]);
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM precsysa_sv.users WHERE id = ?', [id]);
    return deleteOp;
  }

  async create({
    nome, email, hashedPassword, cpfcnpj, endereco, telefone, qualificacao, obs, ativo,
    permissao_email, permissao_proposta, permissao_expcartorio, foto, admin,
  }) {
    const row = await db.query(`
    INSERT INTO precsysa_sv.users(nome, email, password, cpfcnpj, endereco, telefone, qualificacao, obs, ativo, permissao_email, permissao_proposta, permissao_expcartorio, foto, admin)
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [nome, email, hashedPassword, cpfcnpj, endereco, telefone, qualificacao, obs, ativo, permissao_email, permissao_proposta, permissao_expcartorio, foto, admin]);

    return row;
  }

  async update(id, {
    nome, email, hashedPassword, cpfcnpj, endereco, telefone, qualificacao, obs, ativo,
    permissao_email, permissao_proposta, permissao_expcartorio, foto, admin,
  }) {
    const row = await db.query(`
    UPDATE precsysa_sv.users
    SET nome = ?, email = ?, password = ?, cpfcnpj = ?, endereco = ?, telefone = ?, qualificacao = ?, obs = ?, ativo = ?, permissao_email = ?, permissao_proposta = ?, permissao_expcartorio = ?, foto = ?, admin = ?
    WHERE id = ?
    `, [nome, email, hashedPassword, cpfcnpj, endereco, telefone, qualificacao, obs, ativo, permissao_email, permissao_proposta, permissao_expcartorio, foto, admin, id]);

    return row;
  }
}

module.exports = new UsersRepository();
