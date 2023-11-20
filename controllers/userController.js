const db = require("../config/dbConnection");

const syncContact = async (req, res) => {
    try {
        const id = req.body.userId;
        const Contacts = req.body.Contacts
        await db.query('INSERT INTO users (id) VALUES (?)',[id]);
        for (const contact of Contacts) {
            const { name, number } = contact;

            await db.query(
                'INSERT INTO contacts (userId, number) VALUES (?, ?)',
                [id, JSON.stringify({ name, number })]
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

module.exports = {
    syncContact
};
 