class CalculoController {
  render(request, reponse) {
    reponse.render('calculo');
  }
}

module.exports = new CalculoController();
