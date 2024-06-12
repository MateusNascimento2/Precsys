const db = require('../../database/index');

class CessionariosRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM precsysapp_demo.cessionarios');

    return rows;
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
}

module.exports = new CessionariosRepository();
