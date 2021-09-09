const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const pool = require('./DatabaseConfig');

class ProductsService {
  constructor() {
    this.pool = pool;
  }

  async addProduct({
    name, price, qty,
  }) {
    const id = `product-${nanoid(16)}`;

    const result = await this.pool.query('INSERT INTO products (id, name, price, qty) VALUES (?, ?, ?, ?)', [id, name, price, qty]);

    if (result[0].affectedRows === 0) {
      throw new InvariantError('Product gagal ditambahkan');
    }

    return id;
  }

  async getProducts() {
    const [rows] = await this.pool.query('SELECT name, price, qty FROM products');
    return rows;
  }

  async getProductById(id) {
    const [rows] = await this.pool.query('SELECT id, name, price, qty FROM products WHERE id = ?', [id]);

    if (rows.length === 0) {
      throw new NotFoundError('Product tidak ditemukan');
    }

    return rows[0];
  }

  async editProductById(id, { name, price, qty }) {
    const updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

    if (name !== undefined && price !== undefined && qty !== undefined) { // a, b, c
      const result = await this.pool.query('UPDATE products SET name = ?, price = ?, qty = ?, updated_at = ? WHERE id = ?', [name, price, qty, updatedAt, id]);

      if (result[0].affectedRows === 0) {
        throw new NotFoundError('Gagal memperbarui product. Id tidak ditemukan');
      }
    } else if (name !== undefined && price !== undefined && qty === undefined) { // a b
      const result = await this.pool.query('UPDATE products SET name = ?, price = ?, updated_at = ? WHERE id = ?', [name, price, updatedAt, id]);

      if (result[0].affectedRows === 0) {
        throw new NotFoundError('Gagal memperbarui product. Id tidak ditemukan');
      }
    } else if (name !== undefined && price === undefined && qty !== undefined) { // a c
      const result = await this.pool.query('UPDATE products SET name = ?, qty = ?, updated_at = ? WHERE id = ?', [name, qty, updatedAt, id]);

      if (result[0].affectedRows === 0) {
        throw new NotFoundError('Gagal memperbarui product. Id tidak ditemukan');
      }
    } else if (name === undefined && price !== undefined && qty !== undefined) { // b c
      const result = await this.pool.query('UPDATE products SET price = ?, qty = ?, updated_at = ? WHERE id = ?', [price, qty, updatedAt, id]);

      if (result[0].affectedRows === 0) {
        throw new NotFoundError('Gagal memperbarui product. Id tidak ditemukan');
      }
    } else if (name !== undefined) { // a
      const result = await this.pool.query('UPDATE products SET name = ?, updated_at = ? WHERE id = ?', [name, updatedAt, id]);

      if (result[0].affectedRows === 0) {
        throw new NotFoundError('Gagal memperbarui product. Id tidak ditemukan');
      }
    } else if (price !== undefined) { // b
      const result = await this.pool.query('UPDATE products SET price = ?, updated_at = ? WHERE id = ?', [price, updatedAt, id]);

      if (result[0].affectedRows === 0) { // c
        throw new NotFoundError('Gagal memperbarui product. Id tidak ditemukan');
      }
    } else if (qty !== undefined) { // null
      const result = await this.pool.query('UPDATE products SET qty = ?, updated_at = ? WHERE id = ?', [qty, updatedAt, id]);

      if (result[0].affectedRows === 0) {
        throw new NotFoundError('Gagal memperbarui product. Id tidak ditemukan');
      }
    } else {
      throw new InvariantError('Gagal memperbarui product. Field kosong');
    }
  }

  async deleteProductById(id) {
    const result = await this.pool.query('DELETE FROM products WHERE id = ?', [id]);

    if (result[0].affectedRows === 0) {
      throw new NotFoundError('Gagal menghapus product. Id tidak ditemukan');
    }
  }
}

module.exports = ProductsService;
