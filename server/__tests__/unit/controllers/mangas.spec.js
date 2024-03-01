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
				{ name: 'Test Manga 3', date_published: '2024-03-03', description: 'Test data 3' },
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
				error: 'Something happened to your index controller',
			});
		});
	});
});
