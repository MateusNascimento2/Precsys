const FatorNTRepository = require('../repositories/FatorNTRepository');

class FatorNTController {
  async index(request, response) {
    const fatores = await FatorNTRepository.findAll();

    return response.json(fatores);
  }
}

module.exports = new FatorNTController();
