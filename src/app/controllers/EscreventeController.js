const EscreventeRepository = require('../repositories/EscreventeRepository');

class EscreventeController {
  async index(request, response) {
    const escreventes = await EscreventeRepository.findAll();

    return response.json(escreventes);
  }
}

module.exports = new EscreventeController();
