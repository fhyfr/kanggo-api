module.exports = {
  up: 'CREATE TABLE products (id VARCHAR(50) NOT NULL ,  name VARCHAR(50) NOT NULL ,  price INT ,  qty INT , created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  PRIMARY KEY  (id))',
  down: 'DROP TABLE products',
};
