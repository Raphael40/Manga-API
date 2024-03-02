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
			"SELECT id, name, TO_CHAR(date_published, 'YYYY-MM-DD') AS date_published, author, description FROM mangas"
		);

		if (response.rows.length === 0) {
			throw new Error('No mangas available.');
		}
		return response.rows.map(manga => new Manga(manga));
	}

	static async findById(id) {
		try {
			const response = await db.query('SELECT * FROM mangas WHERE id = $1', [id]);
			const manga = new Manga(response.rows[0]);
			return manga;
		} catch (error) {
			throw new Error('Cannot find manga');
		}
	}

	static async create(data) {
		if (!data.name) {
			throw new Error('name is missing');
		}

		const response = await db.query(
			'INSERT INTO mangas(name, author, date_published, description) VALUES ($1, $2, $3, $4) RETURNING *',
			[data.name, data.author, data.date_published, data.description]
		);
		return new Manga(response.rows[0]);
	}
}

module.exports = Manga;
