const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const pool = require('./DatabaseConfig');

class PaymentsService {
  constructor() {
    this.pool = pool;
  }

  async addPayment({
    credentialId,
    orderId,
    amount,
  }) {
    await this.checkAmount(orderId, amount);

    const id = `payment-${nanoid(16)}`;
    const status = 'paid';

    const result = await this.pool.query('INSERT INTO payments(id, order_id, status, amount) VALUES(?, ?, ?, ?)', [id, orderId, status, amount]);

    if (result[0].affectedRows === 0) {
      throw new InvariantError('Pembayaran gagal');
    }

    return id;
  }

  async checkAmount(orderId, amount) {
    const [rows] = await this.pool.query('SELECT amount FROM orders WHERE order_id = ?', [orderId]);

    if (rows[0].amount !== amount) {
      throw new InvariantError('Pembayaran gagal, jumlah pembayaran tidak sesuai');
    }
  }
}