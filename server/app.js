const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const app = express();

// Handles requests that include a JSON payload in their body. e.g. POST
app.use(express.json());
app.use(cors());
app.use(logger('dev'));

app.get('/', (req, res) => {
	res.send({
		message: 'welcome',
		description: 'Manga API',
		endpoints: [
			'GET    /            200',
			'GET    /mangas       200',
			'GET    /mangas/:id   200',
			'POST   /mangas       201',
			'PATCH  /mangas/:id   200',
			'DELETE /mangas/:id   204',
		],
	});
});

app.post('/', (req, res) => {
	res.status(405).send('Not allowd! Visit /mangas');
});

module.exports = app;
