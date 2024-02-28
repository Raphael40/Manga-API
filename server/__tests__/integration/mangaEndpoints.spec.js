const request = require('supertest');
const app = require('../../app.js');

describe('api server', () => {
	let api;
	const port = 4000;

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
});
