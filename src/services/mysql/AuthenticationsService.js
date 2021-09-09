const pool = require('./DatabaseConfig');
const InvariantError = require('../../exceptions/InvariantError');

class AuthenticationsService {
  constructor() {
    this.pool = pool;
  }

  async addRefreshToken(token) {
    await this.pool.query('INSERT INTO authentications VALUES(?)', [token]);
  }

  async verifyRefreshToken(token) {
    const [rows] = await this.pool.query('SELECT * FROM authentications WHERE token = ? ', [token]);

    if (!rows.length) {
      throw new InvariantError('Refresh token tidak valid');
    }
  }

  async deleteRefreshToken(token) {
    await this.pool.query('DELETE FROM authentications WHERE token = ?', [token]);
  }
}

module.exports = AuthenticationsService;
