const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  port: process.env.DATABASE_PORT,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

exports.query = async (query, values) => {
  const [results] = await connection.query(query, values);
  return results;
};
