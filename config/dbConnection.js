const { Client } = require("pg");

try {
  const client = new Client({
    user: "root",
    host: "localhost",
    database: "postgres",
    password: "root",
    port: 5432,
  });
  client.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });
} catch (error) {
  console.log("Error connecting DB", err);
}

module.exports = client;
