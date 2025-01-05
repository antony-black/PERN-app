const Router = require('express').Router;
const router = new Router();

const typeController = require('../controllers/typeController');
const checkRole = require('../middlewares/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), typeController.create);
router.get('/', typeController.getAll);

module.exports = router;