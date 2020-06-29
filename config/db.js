const mysql = require('mysql');

var connection = mysql.createConnection( {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'hotels'
});

connection.connect(err => {
    if(err)throw err;
    else console.log('Connected to ' + connection.config.database);
});

module.exports = connection;