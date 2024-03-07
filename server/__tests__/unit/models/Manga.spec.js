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
				{ name: 'Test Manga 3', date_published: '2024-03-03', description: 'Test data 3' }
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
				description: 'Test data'
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

	describe('create', () => {
		it('creates new database entry on success', async () => {
			let mangaData = {
				name: 'Baka and Test',
				author: 'Kenji Inoue',
				date_published: '2007-01-29',
				description: 'Manga for testing'
			};
			jest.spyOn(Manga, 'getAll').mockResolvedValueOnce([]);
			jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ ...mangaData, id: 1 }] });

			const result = await Manga.create(mangaData);

			expect(result).toBeTruthy();
			expect(result).toHaveProperty('id');
			expect(result.name).toBe('Baka and Test');
			expect(result.date_published).toBe('2007-01-29');
			expect(result.description).toBe('Manga for testing');
		});

		it('should throw an error when no name is provided', async () => {
			try {
				await Manga.create({ date_published: '2024-01-01', description: 'Test data' });
			} catch (error) {
				expect(error).toBeTruthy();
				expect(error.message).toBe('name is missing');
			}
		});

		it('Should throw an error when manga already exists', async () => {
			let mangaData = {
				name: 'Baka and Test',
				author: 'Kenji Inoue',
				date_published: '2007-01-29',
				description: 'Manga for testing'
			};
			jest.spyOn(Manga, 'getAll').mockResolvedValueOnce([{ ...mangaData, id: 1 }]);
			try {
				await Manga.create(mangaData);
			} catch (error) {
				expect(error).toBeTruthy();
				expect(error.message).toBe('This manga already exists');
			}
		});

		it('should throw an Error on db query error', async () => {
			let mangaData = {
				name: 'Baka and Test',
				author: 'Kenji Inoue',
				date_published: '2007-01-29',
				description: 'Manga for testing'
			};
			jest.spyOn(Manga, 'getAll').mockResolvedValueOnce([]);
			jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] });

			try {
				await Manga.create(mangaData);
			} catch (error) {
				expect(error).toBeTruthy();
				expect(error.message).toBe('Could not create new manga');
			}
		});
	});

	describe('update', () => {
		it('should return the updated manga on success', async () => {
			const manga = new Manga({
				name: 'Baka and Test',
				author: 'Kenji Inoue',
				date_published: '2007-01-29',
				description: 'Manga for testing'
			});

			jest.spyOn(db, 'query').mockResolvedValueOnce({
				rows: [
					{
						id: 4,
						name: 'Baka and Test',
						author: 'Kenji Inoue',
						date_published: '2007-01-29',
						description: 'Manga for testing model update function'
					}
				]
			});

			const result = await manga.update({
				name: 'Baka and Test',
				description: 'Manga for testing model update function'
			});

			expect(result).toBeInstanceOf(Manga);
			expect(result.id).toBe(4);
			expect(result.name).toBe('Baka and Test');
			expect(result.description).toBe('Manga for testing model update function');
			expect(result).not.toEqual(manga);
		});

		it('should throw an error if name is missing', async () => {
			try {
				const manga = new Manga({
					name: 'Baka and Test',
					author: 'Kenji Inoue',
					date_published: '2007-01-29',
					description: 'Manga for testing'
				});
				await manga.update({
					description: 'Manga for testing model update function'
				});
			} catch (error) {
				expect(error).toBeTruthy();
				expect(error.message).toBe('Name missing');
			}
		});

		it('should throw an error if name is only field present', async () => {
			try {
				const manga = new Manga({
					name: 'Baka and Test',
					author: 'Kenji Inoue',
					date_published: '2007-01-29',
					description: 'Manga for testing'
				});
				await manga.update({
					name: 'Baka and Test'
				});
			} catch (error) {
				expect(error).toBeTruthy();
				expect(error.message).toBe('The request was recieved but no data was sent');
			}
		});

		it('should throw an error on db query error', async () => {
			try {
				const manga = new Manga({
					name: 'Baka and Test',
					author: 'Kenji Inoue',
					date_published: '2007-01-29',
					description: 'Manga for testing'
				});
				await manga.update({
					name: 'Incorrect name',
					description: 'Manga for testing model update function'
				});
			} catch (error) {
				expect(error).toBeTruthy();
				expect(error.message).toBe('Manga not found');
			}
		});
	});

	describe('destroy', () => {
		it('should return the deleted manga', async () => {
			const manga = new Manga({
				name: 'Baka and Test',
				author: 'Kenji Inoue',
				date_published: '2007-01-29',
				description: 'Manga for testing'
			});

			jest.spyOn(db, 'query').mockResolvedValueOnce({
				rows: [
					{
						id: 4,
						name: 'Baka and Test',
						author: 'Kenji Inoue',
						date_published: '2007-01-29',
						description: 'Manga for testing'
					}
				]
			});

			const result = await manga.delete();

			expect(result).toBeInstanceOf(Manga);
			expect(result.id).toBe(4);
			expect(result.name).toBe('Baka and Test');
			expect(result).not.toEqual(manga);
		});

		it('should throw an error if we cannot locate the manga', async () => {
			jest.spyOn(db, 'query').mockRejectedValue();

			try {
				const manga = new Manga({
					name: 'Baka and Test',
					author: 'Kenji Inoue',
					date_published: '2007-01-29',
					description: 'Manga for testing'
				});
				await manga.delete();
			} catch (error) {
				expect(error).toBeTruthy();
				expect(error.message).toContain('Cannot delete');
			}
		});
	});
});
