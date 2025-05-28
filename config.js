const mysql = require('mysql2/promise');

// 请根据实际情况修改密码
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'douban',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  charset: 'utf8mb4',
});

module.exports = pool; 