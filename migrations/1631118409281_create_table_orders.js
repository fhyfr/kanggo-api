module.exports = {
  up: 'CREATE TABLE orders (id VARCHAR(50) NOT NULL, user_id VARCHAR(50), product_id VARCHAR(50), amount INT, status VARCHAR(10), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id), FOREIGN KEY (user_id) REFERENCES users(id), FOREIGN KEY (product_id) REFERENCES products(id) )',
  down: 'DROP TABLE orders',
};
