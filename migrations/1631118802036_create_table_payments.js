module.exports = {
    "up": "CREATE TABLE payments (id VARCHAR(50) NOT NULL, order_id VARCHAR(50), status VARCHAR(10), amount INT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id), FOREIGN KEY (order_id) REFERENCES orders(id))",
    "down": "DROP TABLE payments"
}