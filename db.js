const mysql = require('mysql2')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'express_user_api'
})

connection.connect((err) => {
    if (err) throw err
    console.log('Connected to MySQL server')
})

module.exports = connection
