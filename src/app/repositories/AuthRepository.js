const bcrypt = require('bcrypt');
const db = require('../../database/index');

class AuthRepository {
  async IsCpfCnpjRegistered(cpfcnpj) {
    const [row] = await db.query(`
    SELECT *
    FROM precsysapp_demo.users
    WHERE users.cpfcnpj = ?
    `, [cpfcnpj]);

    if (!row) {
      return null;
    }

    return row;
  }

  async IsRegistered(cpfcnpj, password) {
    const [row] = await db.query(`
    SELECT *
    FROM precsysapp_demo.users
    WHERE users.cpfcnpj = ?
  `, [cpfcnpj]);

    if (!row) {
      return null;
    }

    const hashedPassword = row.password;

    const isPasswordValid = await bcrypt.compare(password, hashedPassword);

    if (isPasswordValid) {
      return row;
    }
    return null;
  }

  async clientLog(clientID, clientIp, data) {
    const row = await db.query('INSERT INTO precsysapp_demo.logs_login(usuario, ip, data) VALUES(?, ?, ?)', [clientID, clientIp, data]);

    return row;
  }
}

module.exports = new AuthRepository();
