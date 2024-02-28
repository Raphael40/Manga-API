const { Pool } = require('pg');

require('dotenv').config();

const db = new Pool({
	connectionString: process.env.DB_URL,
});

const checkConnection = async () => {
	try {
		const client = await db.connect();
		// Check if client database matches DB_URL
		if (client.database === 'ohsbdtkn') {
			console.log('Connected to the database: ohsbdtkn');
		}
		client.release();
		db.end();
	} catch (error) {
		console.error('Error connecting to the database:', error);
	}
};

checkConnection();

module.exports = db;
