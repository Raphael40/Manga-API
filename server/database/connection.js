const { Pool } = require('pg');

require('dotenv').config();

const db = new Pool({
	connectionString: process.env.NODE_ENV === 'test' ? process.env.TEST_DB : process.env.DB_URL,
});

module.exports = db;
