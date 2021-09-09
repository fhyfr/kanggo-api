const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const InvariantError = require('../../exceptions/InvariantError');
const AuthenticationsError = require('../../exceptions/AuthenticationError');
const pool = require('./DatabaseConfig');

class UsersService {
  constructor() {
    this.pool = pool;
  }

  async addUser({ name, email, password }) {
    await this.verifyEmail(email);

    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)';

    const result = await this.pool.query(sql, [id, name, email, hashedPassword]);

    if (result.affectedRows === 0) {
      throw new InvariantError('Gagal menambahkan user');
    }

    return id;
  }

  async verifyEmail(email) {
    const [rows] = await this.pool.query('SELECT email FROM users WHERE email = ? ', [email]);

    if (rows.length > 0) {
      throw new InvariantError('Gagal menambahkan user. Email sudah digunakan.');
    }
  }

  async verifyUserCredential(email, password) {
    const [rows] = await this.pool.query('SELECT id, password FROM users WHERE email = ? ', [email]);

    if (!rows.length) {
      throw new AuthenticationsError('Kredensial yang Anda berikan salah');
    }

    const { id, password: hashedPassword } = rows[0];
    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationsError('Kredensial yang Anda berikan salah');
    }

    return id;
  }
}

module.exports = UsersService;
