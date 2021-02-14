const mysql = require('mysql2');

var pool = mysql.createPool({
    "user": "prebelli",
    "password": "mistic170887",
    "database": "colaboradores",
    "host": "mysql873.umbler.com",
    "port": 41890
});

exports.pool = pool;