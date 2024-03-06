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

	// POST new /manga
	describe('post/', () => {
		it('responds to POST /mangas with a 201 status code', done => {
			const testData = {
				name: 'Baka and Test',
				author: 'Kenji Inoue',
				date_published: '2007-01-29T00:00:00.000Z',
				description: 'Manga for testing'
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
				description: 'Manga for testing'
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

	// PATCH existing manga/:id
	describe('patch/:id', () => {
		it('responds to PATCH /mangas/1 with status 200', done => {
			const testData = {
				name: 'Baka and Test',
				author: 'Kenji Inoue',
				date_published: '2007-01-29T00:00:00.000Z',
				description: 'Manga for testing'
			};

			request(api)
				.patch('/mangas/1')
				.send(testData)
				.set('Accept', 'application/json')
				.expect(200)
				.expect({ data: { ...testData, id: 1 } }, done);
		});

		it("returns an error if manga doesn't exist", done => {
			const testData = {
				name: 'Baka and Test',
				author: 'Kenji Inoue',
				date_published: '2007-01-29T00:00:00.000Z',
				description: 'Manga for testing'
			};

			request(api)
				.patch('/mangas/4')
				.send(testData)
				.set('Accept', 'application/json')
				.expect(400)
				.expect({ error: 'Cannot find manga' }, done);
		});

		it('Returns an error if no data is sent', async () => {
			await request(api)
				.patch('/mangas/1')
				.send({})
				.set('Accept', 'application/json')
				.expect(400)
				.expect({ error: 'The request was recieved but no data was sent' });
		});
	});

	// DELETE existing /manga/:id
	describe('delete/:id', () => {
		it('responds to DELETE /mangas/:id with status 204', done => {
			request(api).delete('/mangas/1').expect(204, done);
		});

		it('creates and then deletes a manga', async () => {
			const testData = {
				name: 'Baka and Test',
				author: 'Kenji Inoue',
				date_published: '2007-01-29T00:00:00.000Z',
				description: 'Manga for testing'
			};

			await request(api)
				.post('/mangas')
				.send(testData)
				.set('Accept', 'application/json')
				.expect(201)
				.expect({ data: { ...testData, id: 4 } });

			await request(api).delete('/mangas/4').expect(204);
		});

		it('responds to DELETE with a 404 status code if the manga does not exist', done => {
			request(api).delete('/mangas/9').expect(404, done);
		});

		it('responds to DELETE /mangas/:id with status 204', async () => {
			const responseBeforeDeletion = await request(api).get('/mangas');
			expect(responseBeforeDeletion.body.data.length).toBe(3);

			await request(api).delete('/mangas/1').expect(204);

			const responseAfterDeletion = await request(api).get('/mangas');
			expect(responseAfterDeletion.body.data.length).toBe(2);
		});
	});
});
