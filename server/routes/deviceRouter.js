const Router = require('express').Router;
const router = new Router();

const deviceController = require('../controllers/DeviceController');

router.post('/', deviceController.create);
router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getOne);

module.exports = router;