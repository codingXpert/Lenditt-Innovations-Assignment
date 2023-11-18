const mysql = require("mysql");
const env = require("dotenv").config()
const con = mysql.createConnection({
  host: 'localhost' || process.env.HOST,
  port: '3306' || process.env.DB_PORT,
  database: 'user' || process.env.DATABASE,
  user: 'root' || process.env.USER,
  password: 'root' || process.env.PASSWORD
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected with DB");
});

module.exports = con;