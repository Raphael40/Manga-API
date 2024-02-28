const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const mangasRoutes = require('./routers/mangas');

const app = express();

// Handles requests that include a JSON payload in their body. e.g. POST
app.use(express.json());
app.use(cors());

process.env.NODE_ENV !== 'test' ? app.use(logger('dev')) : app.use(logger('tiny'));

app.use('/mangas', mangasRoutes);

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
	res.status(405).send('Not allowed! Visit /mangas');
});

module.exports = app;
