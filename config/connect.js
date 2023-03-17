const mysql = require('mysql2');

require('dotenv').config();

const connect = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Gimpy123!@#',
  database: 'employees'
});

module.exports = connect;
