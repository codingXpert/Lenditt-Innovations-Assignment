const db = require("../config/dbConnection");

function createUserTable() {
  const checkExistingTableSql = "SHOW TABLES LIKE 'users'";
  db.query(checkExistingTableSql, (err, existingTable) => {
    if (err) throw err;

    if (existingTable.length === 0) {
      const createTableSql = `CREATE TABLE users(id INT PRIMARY KEY)`;
      db.query(createTableSql, (err, data) => {
        if (err) throw err;
        console.log("Table users Is Created Successfully");
      });
    }
  });
}
module.exports = createUserTable(); 