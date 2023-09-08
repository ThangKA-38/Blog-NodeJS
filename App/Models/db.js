const mysql = require('mysql')
const dbConfig = require('../Config/db.config')


const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

connection.connect(error => {
    if (error) throw error;
    else console.log("Successfully connected to the account");
})

module.exports = connection;