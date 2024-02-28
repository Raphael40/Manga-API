const { Router } = require('express');
const router = Router();

const mangasController = require('../controllers/mangas');

router.get('/', mangasController.index);

module.exports = router;
