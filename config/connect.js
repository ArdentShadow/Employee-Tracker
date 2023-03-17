const mysql = require('mysql2');

const connect = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Gimpy123!@#',
  database: 'employee_manifest'
});

module.exports = connect;
