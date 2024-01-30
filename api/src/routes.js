const { Router } = require('express');
const UserController = require('./app/controllers/UserController');
const LoginController = require('./app/controllers/LoginController');
const DashboardController = require('./app/controllers/DashboardController');
const CalculoController = require('./app/controllers/CalculoController');
const CessionController = require('./app/controllers/CessionController');
const { validateToken, isAdmin, isActive } = require('./JWT');

const router = Router();

router.get('/api/login', LoginController.render);
router.post('/api/login', LoginController.login);

router.use(validateToken);
router.use(isActive);

router.get('/api/users', isAdmin, UserController.index);
router.get('/users/:id', UserController.show);
router.delete('/users/:id', UserController.delete);
router.post('/users', UserController.store);
router.put('/users/:id', UserController.update);

router.get('/api/calculo', CalculoController.render);

router.get('/api/cessions', CessionController.index);

router.get('/api/dashboard', DashboardController.render);

module.exports = router;
