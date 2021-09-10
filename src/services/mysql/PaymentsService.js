const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const pool = require('./DatabaseConfig');

class PaymentsService {
  constructor() {
    this.pool = pool;
  }

  async addPayment({
    orderId,
    amount,
  }) {
    const id = `payment-${nanoid(16)}`;
    const status = 'process';

    const result = await this.pool.query('INSERT INTO payments(id, order_id, status, amount) VALUES(?, ?, ?, ?)', [id, orderId, status, amount]);

    await this.pool.query('UPDATE orders SET status = ? WHERE id = ? ', [status, orderId]);

    if (result[0].affectedRows === 0) {
      throw new InvariantError('Pembayaran gagal ditambahkan');
    }

    return id;
  }

  async getPaymentById(paymentId) {
    const [rows] = await this.pool.query('SELECT id, order_id AS orderId, status, amount FROM payments WHERE id = ?', [paymentId]);

    if (!rows.length) {
      throw new NotFoundError('Payment tidak ditemukan');
    }

    return rows;
  }

  async processPayment(paymentId, amount) {
    await this.checkAmount(paymentId, amount);

    const result = await this.pool.query('UPDATE payments SET status="paid" WHERE id = ?', [paymentId]);

    if (result[0].affectedRows === 0) {
      throw new InvariantError('Pembayaran gagal diproses');
    }

    // update status in table orders
    const [rows] = await this.pool.query('SELECT * FROM payments WHERE id = ?', [paymentId]);

    const orderId = rows[0].order_id;

    const order = await this.pool.query('UPDATE orders SET status="paid" WHERE id = ?', [orderId]);

    if (order[0].affectedRows === 0) {
      throw new InvariantError('Pembayaran gagal diproses');
    }
  }

  async checkAmount(paymentId, amount) {
    const [rows] = await this.pool.query('SELECT amount FROM payments WHERE id = ?', [paymentId]);

    if (!rows.length) {
      throw new NotFoundError('Payment tidak ditemukan');
    }

    if ((rows[0].amount).toString() !== amount) {
      throw new InvariantError('Pembayaran gagal, jumlah pembayaran tidak sesuai');
    }
  }
}

module.exports = PaymentsService;