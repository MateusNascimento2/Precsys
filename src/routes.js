const { Router } = require('express');
const UserController = require('./app/controllers/UserController');
const AuthController = require('./app/controllers/AuthController');
const RefreshTokenController = require('./app/controllers/RefreshTokenController');
const CessaoController = require('./app/controllers/CessaoController');
const { validateToken } = require('./JWT');
const CessionarioController = require('./app/controllers/CessionarioController');
const AndamentoController = require('./app/controllers/AndamentoController');
const LogoutController = require('./app/controllers/LogoutController');
const StatusController = require('./app/controllers/StatusController');
const OrcamentosController = require('./app/controllers/OrcamentosController');
const NaturezaController = require('./app/controllers/NaturezaController');
const EmpresaController = require('./app/controllers/EmpresaController');
const OrcamentoAnoController = require('./app/controllers/OrcamentoAnoController');
const VaraController = require('./app/controllers/VaraController');
const TeleController = require('./app/controllers/TeleController');
const EscreventeController = require('./app/controllers/EscreventeController');
const JuridicoController = require('./app/controllers/JuridicoController');
const FatorNTController = require('./app/controllers/FatorNTController');
const JurosPoupancaController = require('./app/controllers/JurosPoupancaController');
const SelicAcumuladoJFController = require('./app/controllers/SelicAcumuladoJFController');
const LogsController = require('./app/controllers/LogsController');

const router = Router();

router.post('/api/checkCpfCnpj', AuthController.checkCpfCnpj);
router.post('/api/login', AuthController.login);
router.get('/api/refresh', RefreshTokenController.handleRefreshToken);
router.get('/api/logout', LogoutController.handleLogout);

router.post('/api/users', UserController.store);

// router.use(validateToken);
// router.use(isActive);

router.get('/api/users', UserController.index);
router.get('/api/users/:id', UserController.show);
router.delete('/api/users/:id', UserController.delete);

router.put('/api/users/:id', UserController.update);

router.get('/api/status', StatusController.index);

router.get('/api/orcamentos', OrcamentosController.index);

router.get('/api/orcamentosAnos', OrcamentoAnoController.index);

router.get('/api/natureza', NaturezaController.index);

router.get('/api/empresas', EmpresaController.index);

router.get('/api/cessoes', CessaoController.index);
router.get('/api/cessoes/:id', CessaoController.show);
router.post('/api/cessoes', CessaoController.store);
router.delete('/api/cessoes/:id', CessaoController.delete);

router.get('/api/cessionarios', CessionarioController.index);
router.post('/api/cessionarios', CessionarioController.store);

router.get('/api/andamentos/:precatorio', AndamentoController.index);

router.get('/api/vara', VaraController.index);

router.get('/api/tele', TeleController.index);

router.get('/api/escreventes', EscreventeController.index);

router.get('/api/juridicos', JuridicoController.index);

router.get('/api/fatorNT', FatorNTController.index);

router.get('/api/jurosPoupanca', JurosPoupancaController.index);

router.get('/api/selicAcumuladoJF', SelicAcumuladoJFController.index);

router.get('/api/loginLogs', LogsController.index);

module.exports = router;
