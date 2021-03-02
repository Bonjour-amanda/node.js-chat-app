const mysql = require('mysql') // Import mysql

// Make mysql connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'amanda’',
  password: 'amanda',
  database: 'chat-endpoint'
})

module.exports = connection; // export connection