const TeleRepository = require('../repositories/TeleRepository');

class TeleController {
  async index(request, response) {
    const teles = await TeleRepository.findAll();

    return response.json(teles);
  }
}

module.exports = new TeleController();
