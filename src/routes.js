const { Router } = require('express');
const UserController = require('./app/controllers/UserController');
const LoginController = require('./app/controllers/LoginController');
const CalculoController = require('./app/controllers/CalculoController');
const CessaoController = require('./app/controllers/CessaoController');
const { validateToken, isAdmin, isActive } = require('./JWT');
const CessionarioController = require('./app/controllers/CessionarioController');
const AndamentoController = require('./app/controllers/AndamentoController');

const router = Router();

router.post('/api/checkCpfCnpj', LoginController.checkCpfCnpj);
router.post('/api/login', LoginController.login);

router.use(validateToken);
router.use(isActive);

router.get('/api/users', isAdmin, UserController.index);
router.get('/api/users/:id', UserController.show);
router.delete('/api/users/:id', UserController.delete);
router.post('/api/users', UserController.store);
router.put('/api/users/:id', UserController.update);

router.get('/api/calculo', CalculoController.render);

router.get('/api/cessions', CessaoController.index);

router.get('/api/cessionarios', CessionarioController.index);

router.get('/api/andamentos/:precatorio', AndamentoController.index);

module.exports = router;
