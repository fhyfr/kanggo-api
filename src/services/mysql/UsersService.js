const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const InvariantError = require('../../exceptions/InvariantError');
const pool = require('./db_config');

class UsersService {
  constructor() {
    this.pool = pool;
  }

  async addUser({ name, email, password }) {
    await this.verifyEmail(email);

    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users VALUES ?';
    const values = [id, name, email, hashedPassword];

    console.log(values);

    const result = await this.pool.execute(sql, [values]);

    console.log(result);
  }

  async verifyEmail(email) {
    const result = await this.pool.execute('SELECT email FROM `users` WHERE `email` = ? ', [email]);

    if (result.rows.length > 0) {
      throw new InvariantError('Gagal menambahkan user. Email sudah digunakan.');
    }
  }
}

module.exports = UsersService;