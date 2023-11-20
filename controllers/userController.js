const db = require("../config/dbConnection");

// API to sync user
const syncContact = async (req, res) => {
    try {
        const id = req.body.userId;
        const contacts = req.body.Contacts;

        await db.query('INSERT INTO users (id) VALUES (?)', [id]);

        for (const contact of contacts) {
            const { name, number } = contact;

            await db.query(
                'INSERT INTO contacts (userId, name, number) VALUES (?, ?, ?)',
                [id, name, number]
            );
            console.log("Inserted contact:", name, number);
        }

        console.log('Contacts saved successfully');
        res.json({ success: true, message: 'Contacts saved successfully' });
    } catch (error) {
        console.error('Error saving contacts:', error);
        res.status(500).json({ success: false, message: 'Error saving contacts' });
    }
}

// API to find common users
const findCommonUser = async (req, res) => {
    try {
        const { searchNumber } = req.query;
  const query = 'SELECT userId, name FROM contacts WHERE number = ?';

  db.query(query, searchNumber, (err, results) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Error fetching data' });
      throw err;
    }

    if (results.length === 0) {
      res.json({ Name: 'Not found', commonUsers: [] });
    } else {
      const name = results[0].name;
      const commonUsers = results.map(result => result.userId);

      const uniqueCommonUsers = [...new Set(commonUsers)]; // Removing duplicates

      res.json({ Name: name, commonUsers: uniqueCommonUsers });
    }
  });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

//API to get contacts by Id
const getContactById = async(req, res) => {
    const { userId, page = 1, PageSize = 10, searchText } = req.query;
  let query = 'SELECT COUNT(*) as totalCount FROM contacts WHERE userId = ?';
  let values = [userId];

  if (searchText) {
    query += ' AND name LIKE ?';
    values.push(`%${searchText}%`);
  }

  db.query(query, values, (err, countResult) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Error counting contacts' });
      throw err;
    }

    const totalCount = countResult[0].totalCount;
    const offset = (page - 1) * PageSize;

    let selectQuery = 'SELECT name, number FROM contacts WHERE userId = ?';
    let selectValues = [userId];

    if (searchText) {
      selectQuery += ' AND name LIKE ?';
      selectValues.push(`%${searchText}%`);
    }

    selectQuery += ' LIMIT ? OFFSET ?';
    selectValues.push(PageSize, offset);

    db.query(selectQuery, selectValues, (err, rows) => {
      if (err) {
        res.status(500).json({ success: false, message: 'Error fetching contacts' });
        throw err;
      }

      res.json({ totalCount, rows });
    });
  });
}

module.exports = {
    syncContact,
    findCommonUser,
    getContactById
};
 