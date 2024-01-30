const { Router } = require('express');
const UserController = require('./app/controllers/UserController');
const CategoryController = require('./app/controllers/CategoryController');
const LoginController = require('./app/controllers/LoginController');
const DashboardController = require('./app/controllers/DashboardController');
const CalculoController = require('./app/controllers/CalculoController');
const CessionController = require('./app/controllers/CessionController');
const { validateToken, isAdmin, isActive } = require('./JWT');

const router = Router();

router.get('/login', LoginController.render);
router.post('/login', LoginController.login);

router.use(validateToken);
router.use(isActive);

router.get('/users', isAdmin, UserController.index);
router.get('/users/:id', UserController.show);
router.delete('/users/:id', UserController.delete);
router.post('/users', UserController.store);
router.put('/users/:id', UserController.update);

router.get('/calculo', CalculoController.render);

router.get('/cessions', CessionController.index);

router.get('/categories', CategoryController.index);
router.post('/categories', CategoryController.store);

router.get('/dashboard', DashboardController.render);

module.exports = router;
