const Manga = require('../../../models/Manga');
const db = require('../../../database/connection');

describe('Manga', () => {
	beforeEach(() => jest.clearAllMocks());

	afterAll(() => jest.resetAllMocks());

	describe('getAll', () => {
		it('resolves with all mangas on success', async () => {
			const testData = [
				{ name: 'Test Manga', date_published: '2024-01-01', description: 'Test data' },
				{ name: 'Test Manga 2', date_published: '2024-02-02', description: 'Test data 2' },
				{ name: 'Test Manga 3', date_published: '2024-03-03', description: 'Test data 3' },
			];

			jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: testData });

			const mangas = await Manga.getAll();

			expect(mangas).toHaveLength(testData.length);
			expect(mangas[0]).toEqual(expect.objectContaining({ name: 'Test Manga' }));
			expect(mangas[1]).toEqual(expect.objectContaining({ date_published: '2024-02-02' }));
			expect(mangas[2]).toEqual(expect.objectContaining({ description: 'Test data 3' }));
		});

		it('Throws an error if the database returns nothing', async () => {
			jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });

			try {
				await Manga.getAll();
			} catch (error) {
				expect(error.message).toBe('No mangas available.');
			}
		});
	});

	describe('getById', () => {
		it('returns manga by id on success', async () => {
			let testManga = {
				id: 1,
				name: 'Test Manga',
				date_published: '2024-01-01',
				description: 'Test data',
			};
			jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [testManga] });

			const result = await Manga.findById(1);
			expect(result).toBeInstanceOf(Manga);
			expect(result.id).toBe(1);
			expect(result.name).toBe('Test Manga');
			expect(result.date_published).toBe('2024-01-01');
			expect(result.description).toBe('Test data');
		});

		it('should throw an Error on db query error', async () => {
			jest.spyOn(db, 'query').mockRejectedValue();

			try {
				await Manga.findById('red');
			} catch (error) {
				expect(error).toBeTruthy();
				expect(error.message).toBe('Cannot find manga');
			}
		});
	});
});
