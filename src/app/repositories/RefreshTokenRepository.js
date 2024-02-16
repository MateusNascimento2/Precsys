const db = require('../../database/index');

class RefreshTokenRepository {
  async store(id, refreshToken) {
    const row = await db.query(`
      UPDATE precsysa_dev.users SET refreshToken = ?
      WHERE id = ?
    `, [refreshToken, id]);

    return row;
  }
}

module.exports = new RefreshTokenRepository();
