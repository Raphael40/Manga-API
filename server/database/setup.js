const fs = require('fs');

require('dotenv').config();

const db = require('./connection');

const sql = fs.readFileSync(__dirname + '/setup.sql').toString();

const setupDatabase = async () => {
	try {
		const data = await db.query(sql);
		db.end;
		console.log('Set-up complete.');
	} catch (error) {
		console.log(error);
	}
};

setupDatabase();
