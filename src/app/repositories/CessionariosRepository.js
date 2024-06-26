const db = require('../../database/index');

class CessionariosRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM precsysapp_demo.cessionarios');

    return rows;
  }

  async findById(id) {
    const row = await db.query('SELECT * FROM precsysapp_demo.cessionarios WHERE cessionarios.id = ? ', [id]);

    return row;
  }

  async create({
    id_cessao,
    cessionario,
    valorPago,
    comissao,
    percentual,
    expectativa,
    obs,
    assinatura,
    expedido,
    recebido,
  }) {
    const row = await db.query('INSERT INTO precsysapp_demo.cessionarios(cessao_id, user_id, valor_pago, comissao, percentual, exp_recebimento, obs, assinatura, expedido, recebido) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [id_cessao, cessionario, valorPago, comissao, percentual, expectativa, obs, assinatura, expedido, recebido]);

    return row;
  }

  async update(id, {
    // eslint-disable-next-line max-len
    valorPagoEditado, comissaoEditado, percentualEditado, expectativaEditado, cessionarioEditado, obsEditado, assinaturaEditado, expedidoEditado, recebidoEditado,
  }) {
    const row = await db.query(`
    UPDATE precsysapp_demo.cessionarios
    SET valor_pago = ?, comissao = ?, percentual = ?, exp_recebimento = ?, user_id = ?, obs = ?, assinatura = ?, expedido = ?, recebido = ?
    WHERE id = ?
    `, [valorPagoEditado, comissaoEditado, percentualEditado, expectativaEditado, cessionarioEditado, obsEditado, assinaturaEditado, expedidoEditado, recebidoEditado, id]);

    return row;
  }

  async delete(id) {
    // Deleta os cessionários associados à cessão
    const deleteCessionario = await db.query('DELETE FROM precsysapp_demo.cessionarios WHERE cessionarios.id = ?', [id]);

    return deleteCessionario;
  }
}

module.exports = new CessionariosRepository();
