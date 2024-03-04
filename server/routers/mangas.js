const { Router } = require('express');
const router = Router();

const mangasController = require('../controllers/mangas');

router.get('/', mangasController.index);
router.get('/:id', mangasController.findById);
router.post('/', mangasController.create);
router.patch('/:id', mangasController.update);

module.exports = router;
