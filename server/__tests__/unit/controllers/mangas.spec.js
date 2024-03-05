const mangasController = require('../../../controllers/mangas');
const Manga = require('../../../models/Manga');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockEnd = jest.fn();
// we are mocking .send(), .json() and .end()
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: mockEnd }));
const mockRes = { status: mockStatus };

describe('mangas controller', () => {
	beforeEach(() => jest.clearAllMocks());

	afterAll(() => jest.resetAllMocks());

	describe('index', () => {
		it('should return mangas with a status code of 200', async () => {
			const testMangas = [
				{ name: 'Test Manga', date_published: '2024-01-01', description: 'Test data' },
				{ name: 'Test Manga 2', date_published: '2024-02-02', description: 'Test data 2' },
				{ name: 'Test Manga 3', date_published: '2024-03-03', description: 'Test data 3' }
			];

			jest.spyOn(Manga, 'getAll').mockResolvedValue(testMangas);

			await mangasController.index(null, mockRes);

			expect(Manga.getAll).toHaveBeenCalledTimes(1);
			expect(mockStatus).toHaveBeenCalledWith(200);
			expect(mockSend).toHaveBeenCalledWith({ data: testMangas });
		});

		it('sends an error upon fail', async () => {
			jest
				.spyOn(Manga, 'getAll')
				.mockRejectedValue(new Error('Something happened to your index controller'));

			await mangasController.index(null, mockRes);

			expect(Manga.getAll).toHaveBeenCalledTimes(1);
			expect(mockStatus).toHaveBeenCalledWith(500);
			expect(mockSend).toHaveBeenCalledWith({
				error: 'Something happened to your index controller'
			});
		});
	});

	describe('getById', () => {
		let testManga, mockReq;
		beforeEach(() => {
			testManga = { id: 1, name: 'Test Manga', date_published: '2024-01-01' };
			mockReq = { params: { id: 1 } };
		});

		it('Should return a single manga by id on success', async () => {
			jest.spyOn(Manga, 'findById').mockResolvedValue(new Manga(testManga));

			await mangasController.findById(mockReq, mockRes);

			expect(Manga.findById).toHaveBeenCalledTimes(1);
			expect(mockStatus).toHaveBeenCalledWith(200);
			expect(mockSend).toHaveBeenCalledWith({ data: new Manga(testManga) });
		});

		it('sends an error upon fail', async () => {
			jest.spyOn(Manga, 'findById').mockRejectedValue(new Error('Error: Cannot findById'));

			await mangasController.findById(mockReq, mockRes);

			expect(Manga.findById).toHaveBeenCalledTimes(1);
			expect(mockStatus).toHaveBeenCalledWith(404);
			expect(mockSend).toHaveBeenCalledWith({ error: 'Error: Cannot findById' });
		});
	});

	describe('create', () => {
		it('it creates a new manga with a 201 status code', async () => {
			let testManga = {
				name: 'Test Manga',
				author: 'Test',
				date_published: '2024-01-01',
				description: 'Test data'
			};
			const mockReq = { body: testManga };

			jest.spyOn(Manga, 'create').mockResolvedValue(new Manga(testManga));

			await mangasController.create(mockReq, mockRes);

			expect(Manga.create).toHaveBeenCalledTimes(1);
			expect(mockStatus).toHaveBeenCalledWith(201);
			expect(mockSend).toHaveBeenCalledWith({ data: new Manga({ ...testManga }) });
		});

		it('it returns an error', async () => {
			let testManga = {
				name: 'Test Manga',
				author: 'Test',
				date_published: '2024-01-01',
				description: 'Test data'
			};
			const mockReq = { body: testManga };

			jest.spyOn(Manga, 'create').mockRejectedValue(new Error('Error: cannot create'));

			await mangasController.create(mockReq, mockRes);

			expect(Manga.create).toHaveBeenCalledTimes(1);
			expect(mockStatus).toHaveBeenCalledWith(400);
			expect(mockSend).toHaveBeenCalledWith({ error: 'Error: cannot create' });
		});
	});

	describe('update', () => {
		it('modifies a row in the database', async () => {
			const testManga = {
				id: 1,
				name: 'Baka and Test',
				author: 'Kenji Inoue',
				date_published: '2007-01-29',
				description: 'Manga for testing'
			};
			jest.spyOn(Manga, 'findById').mockResolvedValue(new Manga(testManga));

			const mockReq = {
				params: { id: 1 },
				body: {
					name: 'Baka and Test',
					description: 'Manga for testing controller update function'
				}
			};

			jest.spyOn(Manga.prototype, 'update').mockResolvedValue({
				...new Manga(testManga),
				id: 1,
				name: 'Baka and Test',
				description: 'Manga for testing controller update function'
			});

			await mangasController.update(mockReq, mockRes);

			expect(Manga.findById).toHaveBeenCalledTimes(1);
			expect(Manga.prototype.update).toHaveBeenCalledTimes(1);
			expect(mockStatus).toHaveBeenCalledWith(200);
			expect(mockSend).toHaveBeenCalledWith({
				data: new Manga({
					id: 1,
					name: 'Baka and Test',
					author: 'Kenji Inoue',
					date_published: '2007-01-29',
					description: 'Manga for testing controller update function'
				})
			});
		});

		it('Should cause an error when it cannot find manga to update', async () => {
			const mockReq = { params: { id: 49 } };

			jest.spyOn(Manga, 'findById').mockRejectedValue(new Error('manga not found'));

			await mangasController.update(mockReq, mockRes);

			expect(Manga.findById).toHaveBeenCalledTimes(1);
			expect(mockStatus).toHaveBeenCalledWith(400);
			expect(mockSend).toHaveBeenCalledWith({ error: 'manga not found' });
		});

		it('Should send an error when the update function fails', async () => {
			const testManga = {
				id: 1,
				name: 'Baka and Test',
				author: 'Kenji Inoue',
				date_published: '2007-01-29',
				description: 'Manga for testing'
			};
			jest.spyOn(Manga, 'findById').mockResolvedValue(new Manga(testManga));

			const mockReq = {
				params: { id: 1 },
				body: {
					name: 'Baka and Test',
					description: 'Manga for testing controller update function'
				}
			};

			jest.spyOn(Manga.prototype, 'update').mockRejectedValue(new Error('Cannot update'));

			await mangasController.update(mockReq, mockRes);

			expect(Manga.findById).toHaveBeenCalledTimes(1);
			expect(Manga.prototype.update).toHaveBeenCalledTimes(1);
			expect(mockStatus).toHaveBeenCalledWith(400);
			expect(mockSend).toHaveBeenCalledWith({ error: 'Cannot update' });
		});
	});

	describe('remove', () => {
		it('returns a 204 status code and the deleted item on success', async () => {
			const testManga = {
				id: 1,
				name: 'Baka and Test',
				author: 'Kenji Inoue',
				date_published: '2007-01-29',
				description: 'Manga for testing controller delete function'
			};
			jest.spyOn(Manga, 'findById').mockResolvedValue(new Manga(testManga));

			jest.spyOn(Manga.prototype, 'delete').mockResolvedValue(new Manga(testManga));

			const mockReq = { params: { id: 1 } };

			await mangasController.remove(mockReq, mockRes);

			expect(Manga.findById).toHaveBeenCalledTimes(1);
			expect(Manga.prototype.delete).toHaveBeenCalledTimes(1);
			expect(mockStatus).toHaveBeenCalledWith(204);
			expect(mockSend).toHaveBeenCalledWith({
				data: new Manga({
					id: 1,
					name: 'Baka and Test',
					author: 'Kenji Inoue',
					date_published: '2007-01-29',
					description: 'Manga for testing controller delete function'
				})
			});
		});

		it('should return an error when it cannot delete the manga', async () => {
			const mockReq = { params: { id: 3 } };

			jest.spyOn(Manga, 'findById').mockRejectedValue(new Error('manga not found'));

			await mangasController.remove(mockReq, mockRes);

			expect(Manga.findById).toHaveBeenCalledTimes(1);
			expect(mockStatus).toHaveBeenCalledWith(404);
			expect(mockSend).toHaveBeenCalledWith({ error: 'manga not found' });
		});

		it('should return an error when it cannot find the manga to delete', async () => {
			const testManga = {
				id: 1,
				name: 'Baka and Test',
				author: 'Kenji Inoue',
				date_published: '2007-01-29',
				description: 'Manga for testing controller delete function'
			};
			jest.spyOn(Manga, 'findById').mockResolvedValue(new Manga(testManga));

			jest.spyOn(Manga.prototype, 'delete').mockRejectedValue(new Error('Cannot delete manga'));

			const mockReq = { params: { id: 3 } };

			await mangasController.remove(mockReq, mockRes);

			expect(Manga.findById).toHaveBeenCalledTimes(1);
			expect(Manga.prototype.delete).toHaveBeenCalledTimes(1);
			expect(mockStatus).toHaveBeenCalledWith(404);
			expect(mockSend).toHaveBeenCalledWith({ error: 'Cannot delete manga' });
		});
	});
});
