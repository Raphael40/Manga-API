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
	});
});
