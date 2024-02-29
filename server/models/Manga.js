const db = require('../database/connection');

class Manga {
	constructor(data) {
		this.id = data.id;
		this.name = data.name;
		this.date_published = data.date_published;
		this.author = data.author;
		this.description = data.description;
	}

	static async getAll() {
		const response = await db.query(
			"SELECT id, name, TO_CHAR(date_published, 'YYYY-MM-DD') AS date_published, author, description FROM manga"
		);

		if (response.rows.length === 0) {
			throw new Error('No mangas available.');
		}
		return response.rows.map(manga => new Manga(manga));
	}
}

module.exports = Manga;
