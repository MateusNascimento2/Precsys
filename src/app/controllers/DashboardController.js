class DashboardController {
  render(request, response) {
    console.log('Dashboard');
    const { user } = request;

    if (user.admin) {
      return response.render('dashboard', { admin: true, message: `Bem-vindo, ${user.nome}` });
    }
    response.render('dashboard', { message: `Bem-vindo, ${user.nome}` });
  }
}

module.exports = new DashboardController();
