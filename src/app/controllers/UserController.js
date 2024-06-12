const bcrypt = require('bcrypt');
const UsersRepository = require('../repositories/UsersRepository');

class UserController {
  async index(request, response) {
    // Listar todos os usuarios
    const { orderBy } = request.query;
    const users = await UsersRepository.findAll(orderBy);

    return response.json(users);
  }

  async show(request, response) {
    // Obter um usuario
    const { id } = request.params;

    const user = await UsersRepository.findById(id);

    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    return response.json(user);
  }

  async store(request, response) {
    // Criar novo usuario
    const {
      nome, email, password, cpfcnpj, endereco, telefone, qualificacao,
      obs, ativo, permissao_email, permissao_proposta, permissao_expcartorio, foto, admin,
    } = request.body;

    if (!nome) {
      return response.status(400).json({ error: 'Name is required' });
    }

    if (!email) {
      return response.status(400).json({ error: 'Email is required' });
    }

    if (!cpfcnpj) {
      return response.status(400).json({ error: 'CPF/CNPJ is required' });
    }

    const userExists = await UsersRepository.findByCPFCNPJ(cpfcnpj);

    if (userExists) {
      return response.status(400).json({ error: 'This CPF/CNPJ is already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    if (!hashedPassword) {
      return response.status(500);
    }

    const user = await UsersRepository.create({
      nome,
      email,
      hashedPassword,
      cpfcnpj,
      endereco,
      telefone,
      qualificacao,
      obs,
      ativo,
      permissao_email,
      permissao_proposta,
      permissao_expcartorio,
      foto,
      admin,
    });

    return response.status(201).json(user);
  }

  async update(request, response) {
    // Editar um usuario
    const { id } = request.params;

    const userID = String(id);

    const {
      nome, email, password, cpfcnpj, endereco, telefone, qualificacao,
      obs, ativo, permissao_email, permissao_proposta, permissao_expcartorio, foto, admin,
    } = request.body;

    const userExists = await UsersRepository.findById(userID);

    if (!userExists) {
      return response.status(404).json({ error: 'User not found' });
    }

    if (!nome) {
      return response.status(400).json({ error: 'Name is required' });
    }

    if (!email) {
      return response.status(400).json({ error: 'Email is required' });
    }

    if (!cpfcnpj) {
      return response.status(400).json({ error: 'CPF/CNPJ is required' });
    }

    const contactByCPFCNPJ = await UsersRepository.findByCPFCNPJ(cpfcnpj);

    if (contactByCPFCNPJ && String(contactByCPFCNPJ.id) !== userID) {
      return response.status(400).json({ error: 'This CPF/CNPJ is already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const user = await UsersRepository.update(userID, {
      nome,
      email,
      hashedPassword,
      cpfcnpj,
      endereco,
      telefone,
      qualificacao,
      obs,
      ativo,
      permissao_email,
      permissao_proposta,
      permissao_expcartorio,
      foto,
      admin,
    });

    return response.json(user);
  }

  async delete(request, response) {
    // Deletar um usuario
    const { id } = request.params;

    await UsersRepository.delete(id);
    return response.sendStatus(204);
  }
}

// Singleton Pattern
module.exports = new UserController();
