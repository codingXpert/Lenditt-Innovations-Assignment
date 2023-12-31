const db = require("../config/dbConnection");

function createContactTable() {
  const checkExistingTableSql = "SHOW TABLES LIKE 'contacts'";
  db.query(checkExistingTableSql, (err, existingTable) => {
    if (err) throw err;

    if (existingTable.length === 0) {
      const createTableSql = `CREATE TABLE contacts
            (
              id INT AUTO_INCREMENT PRIMARY KEY,
              userId INT,
              name VARCHAR(30) NOT NULL,
              number VARCHAR(255) NOT NULL, 
              FOREIGN KEY (userId) REFERENCES users(id)
            )`;  
      db.query(createTableSql, (err, data) => {
        if (err) throw err; 
        console.log("Table contact Is Created Successfully");
      });
    }
  });
}
module.exports = createContactTable(); 