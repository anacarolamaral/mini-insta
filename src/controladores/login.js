const knex = require('../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const senhaHash = require('../senhaHash');

const login = async (req, res) => {
  const { username, senha } = req.body;

  if (!username || !senha) {
    return res.status(404).json('Nome de usuário e senha são obrigatórios')
  }

  try {
    const usuario = await knex('usuarios').where({ username }).first();

    if (!usuario) {
      return res.status(404).json('Usuário não encontrado.')
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(400).json('Usuário e senha não conferem.')
    }

    const tokenDados = {
      id: usuario.id,
      username: usuario.username
    }

    const token = jwt.sign(tokenDados, senhaHash, { expiresIn: '10h' });

    const { senha: _, ...dadosUsuario } = usuario;

    return res.status(200).json({
      usuario: dadosUsuario,
      token
    })

  } catch (error) {
    return res.status(400).json(error.message)
  }
}

module.exports = login