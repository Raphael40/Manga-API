const request = require('supertest');
const app = require('../../app.js');
const { resetTestDB } = require('./config');

describe('api server', () => {
	let api;
	const port = 4000;

	beforeEach(async () => {
		await resetTestDB();
	});

	beforeAll(() => {
		api = app.listen(port, () => {
			console.log(`Test server running on port ${port}`);
		});
	});

	afterAll(done => {
		console.log('Closing server');
		api.close(done);
	});

	describe('/', () => {
		it('responds to GET / with a 200 status code', done => {
			request(api).get('/').expect(200, done);
		});

		it('responds to GET / with a message and a description', async () => {
			const response = await request(api).get('/');

			expect(response.statusCode).toBe(200);
			expect(response.body.message).toBe('welcome');
			expect(response.body.description).toBe('Manga API');
			expect(response.body.endpoints).toBeTruthy;
		});

		it('responds to POST / with a 200 status code', done => {
			request(api).post('/').expect(405, done);
		});

		it('responds to GET / with a message and a description', async () => {
			const response = await request(api).post('/');

			expect(response.statusCode).toBe(405);
			expect(response.text).toBe('Not allowed! Visit /mangas');
		});
	});

	// GET all
	describe('/mangas', () => {
		it('responds to GET /mangas with a 200 status code', done => {
			request(api).get('/mangas').expect(200, done);
		});

		it('GET /mangas retrieves 3 items from the database', async () => {
			const response = await request(api).get('/mangas');
			expect(response.body.data.length).toBe(3);
		});
	});

	// GET by Id
	describe('/:id', () => {
		it('responds to GET /mangas/:id with a 200', done => {
			request(api).get('/mangas/1').expect(200, done);
		});

		it('GET /mangas retrieves 1 item from the database by id', async () => {
			const response = await request(api).get('/mangas/2');
			expect(response.body.data.id).toBe(2);
			expect(response.body.data.name).toBe('Test Manga 2');
		});

		it('responds to a unknown manga id with a 404 status code', done => {
			request(api).get('/mangas/4').expect(404).expect({ error: 'Cannot find manga' }, done);
		});
	});

	// POST new manga
	describe('post/', () => {
		it('responds to POST /mangas with a 201 status code', done => {
			const testData = {
				name: 'Baka and Test',
				author: 'Kenji Inoue',
				date_published: '2007-01-29T00:00:00.000Z',
				description: 'Manga for testing',
			};

			request(api)
				.post('/mangas')
				.send(testData)
				.set('Accept', 'application/json')
				.expect(201)
				.expect({ data: { ...testData, id: 4 } }, done);
		});

		it('Returns an error if a manga with the same name aready exists', done => {
			const testData = {
				name: 'Test Manga',
				author: 'Kenji Inoue',
				date_published: '2007-01-29T00:00:00.000Z',
				description: 'Manga for testing',
			};

			request(api)
				.post('/mangas')
				.send(testData)
				.set('Accept', 'application/json')
				.expect(400)
				.expect({ error: 'This manga already exists' }, done);
		});

		it('Returns an error if a new manga cannot be created', async () => {
			await request(api)
				.post('/mangas')
				.send({})
				.set('Accept', 'application/json')
				.expect(400)
				.expect({ error: 'name is missing' });
		});
	});
});
