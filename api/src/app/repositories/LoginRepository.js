const bcrypt = require('bcrypt');
const db = require('../../database/index');

class LoginRepository {
  async IsRegistered(cpfcnpj, password) {
    const [row] = await db.query(`
    SELECT *
    FROM users
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
}

module.exports = new LoginRepository();
