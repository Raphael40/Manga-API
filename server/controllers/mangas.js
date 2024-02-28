const Manga = require('../models/Manga');

const index = async (req, res) => {
	try {
		const mangasData = await Manga.getAll();
		res.status(200).send({ data: mangasData });
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
};

module.exports = { index };