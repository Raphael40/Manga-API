const Manga = require('../models/Manga');

const index = async (req, res) => {
	try {
		const mangasData = await Manga.getAll();
		res.status(200).send({ data: mangasData });
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
};

const findById = async (req, res) => {
	try {
		const mangaId = parseInt(req.params.id);
		const manga = await Manga.findById(mangaId);
		res.status(200).send({ data: manga });
	} catch (error) {
		res.status(404).send({ error: error.message });
	}
};

const create = async (req, res) => {
	const existingMangas = await Manga.getAll();

	if (existingMangas.some(manga => req.body.name === manga.name)) {
		return res.status(400).send({ error: 'This manga already exists' });
	}

	try {
		const data = req.body;

		const newManga = await Manga.create(data);
		console.log('hi');
		res.status(201).send({ data: newManga });
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
};

module.exports = { index, findById, create };
