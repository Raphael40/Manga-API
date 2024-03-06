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
	try {
		const data = req.body;

		const newManga = await Manga.create(data);
		res.status(201).send({ data: newManga });
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
};

const update = async (req, res) => {
	try {
		const mangaToUpdate = await Manga.findById(parseInt(req.params.id));
		req.body.name ||= mangaToUpdate.name;
		const updatedManga = await mangaToUpdate.update(req.body);
		res.status(200).send({ data: updatedManga });
	} catch (error) {
		res.status(400).send({ error: error.message });
	}
};

const remove = async (req, res) => {
	try {
		const { id } = req.params;
		const manga = await Manga.findById(parseInt(id));
		const deletedManga = await manga.delete();
		res.status(204).end();
	} catch (error) {
		res.status(404).send({ error: error.message });
	}
};

module.exports = { index, findById, create, update, remove };
