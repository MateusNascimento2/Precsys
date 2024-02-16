const { Router } = require('express');
const UserController = require('./app/controllers/UserController');
const AuthController = require('./app/controllers/AuthController');
const RefreshTokenController = require('./app/controllers/RefreshTokenController');
const CessaoController = require('./app/controllers/CessaoController');
const { validateToken, isAdmin, isActive } = require('./JWT');
const CessionarioController = require('./app/controllers/CessionarioController');
const AndamentoController = require('./app/controllers/AndamentoController');
const LogoutController = require('./app/controllers/LogoutController');

const router = Router();

router.post('/api/checkCpfCnpj', AuthController.checkCpfCnpj);
router.post('/api/login', AuthController.login);
router.get('/api/refresh', RefreshTokenController.handleRefreshToken);
router.get('/api/logout', LogoutController.handleLogout);

router.use(validateToken);
router.use(isActive);

router.get('/api/users', isAdmin, UserController.index);
router.get('/api/users/:id', UserController.show);
router.delete('/api/users/:id', UserController.delete);
router.post('/api/users', UserController.store);
router.put('/api/users/:id', UserController.update);

router.get('/api/cessions', CessaoController.index);

router.get('/api/cessionarios', CessionarioController.index);

router.get('/api/andamentos/:precatorio', AndamentoController.index);

module.exports = router;
