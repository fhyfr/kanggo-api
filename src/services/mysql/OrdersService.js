const { nanoid } = require('nanoid');
const AuthorizationError = require('../../exceptions/AuthorizationError');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const pool = require('./DatabaseConfig');

class OrdersService {
  constructor() {
    this.pool = pool;
  }

  async addOrder({
    credentialId,
    productId,
    amount,
  }) {
    await this.checkProduct(productId);

    const id = `order-${nanoid(16)}`;
    const status = 'pending';

    const result = await this.pool.query('INSERT INTO orders (id, user_id, product_id, amount, status) VALUES (?, ?, ?, ?, ?)', [id, credentialId, productId, amount, status]);

    if (result[0].affectedRows === 0) {
      throw new InvariantError('Order gagal');
    }

    return id;
  }

  async getOrders(credentialId) {
    const [rows] = await this.pool.query('SELECT orders.id AS orderId, products.name AS productName, orders.amount, orders.status, orders.created_at AS orderDate FROM orders INNER JOIN products ON orders.product_id = products.id WHERE orders.user_id = ?', [credentialId]);

    return rows;
  }

  async deleteOrderById(credentialId, id) {
    await this.verifyOrderOwner(credentialId);

    const result = await this.pool.query('DELETE FROM orders WHERE user_id = ? AND id = ?', [credentialId, id]);

    if (result[0].affectedRows === 0) {
      throw new NotFoundError('Gagal menghapus order. Id tidak ditemukan');
    }
  }

  async checkProduct(productId) {
    const [rows] = await this.pool.query('SELECT * FROM products WHERE id = ?', [productId]);

    if (!rows.length) {
      throw new NotFoundError('Gagal order. Product tidak ditemukan');
    }
  }

  async verifyOrderOwner(credentialId) {
    const [rows] = await this.pool.query('SELECT * FROM orders WHERE user_id = ?', [credentialId]);

    if (!rows.length) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
  }
}

module.exports = OrdersService;
