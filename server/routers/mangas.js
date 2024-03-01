const { Router } = require('express');
const router = Router();

const mangasController = require('../controllers/mangas');

router.get('/', mangasController.index);
router.get('/:id', mangasController.findById);

module.exports = router;
