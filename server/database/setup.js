const fs = require('fs');

require('dotenv').config();

const db = require('./connection');

const sql = fs.readFileSync(__dirname + '/setup.sql').toString();

// This file is to set up mock data and will not be used in production
const setupDatabase = async () => {
	try {
		await db.query(sql);
		db.end;
		console.log('Set-up complete.');
	} catch (error) {
		console.log(error);
	}
};

setupDatabase();
