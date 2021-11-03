const knex = require('../conexao');
const bcrypt = require('bcrypt')

const obterPerfil = async (req, res) => {
  return res.status(200).json(req.usuario);
}

const atualizarPerfil = async (req, res) => {
  let {
    nome,
    email,
    senha,
    imagem,
    username,
    site,
    bio,
    telefone,
    genero
  } = req.body

  const { id } = req.usuario;

  if (!nome && !email && !senha && !imagem && !username && !site && !bio && !telefone && !genero) {
    return res.status(404).json('Deverá ser informado ao menos um campo pra atualização')
  }

  try {
    if (senha) {
      if (senha.length < 5) {
        return res.status(404).json('A senha deve conter ao menos 5 caracteres.')
      }

      const senha = await bcrypt.hash(senha, 10)
    }

    if (email !== req.usuario.email) {
      const emailExistente = await knex('usuarios').where({ email }).first();

      if (emailExistente) {
        return res.status(404).json('Email já cadastrado no banco de dados.')
      }
    }

    if (username !== req.usuario.username) {
      const usernameExistente = await knex('usuarios').where({ username }).first();

      if (usernameExistente) {
        return res.status(404).json('Username já cadastrado no banco de dados.')
      }
    }

    const usuarioAtualizado = await knex('usuarios')
      .where({ id })
      .update({
        nome,
        email,
        senha,
        imagem,
        username,
        site,
        bio,
        telefone,
        genero
      });

    if (!usuarioAtualizado) {
      return res.status(400).json('Perfil não foi atualizado.')
    }

    return res.status(200).json('Perfil atualizado com sucesso!')

  } catch (error) {
    return res.status(400).json(error.message)
  }
}

const cadastrarUsuario = async (req, res) => {

  const { username, senha } = req.body;

  if (!username || !senha) {
    return res.status(404).json('Os campos username e senha são obrigatórios.')
  }

  if (senha.length < 5) {
    return res.status(404).json('A senha deve conter pelo menos 5 caracteres.')
  }

  try {

    const usuarioExistente = await knex('usuarios').where({ username }).first();

    if (usuarioExistente) {
      return res.status(400).json('Usuário informado já existe no banco de dados.')
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuarioACadastrar = await knex('usuarios').insert({
      username,
      senha: senhaCriptografada
    });

    if (!usuarioACadastrar) {
      return res.status(400).json('Usuário não cadastrado')
    }

    return res.status(200).json('Usuário cadastrado com sucesso!')

  } catch (error) {
    return res.status(400).json(error.message)
  }
}

module.exports = {
  obterPerfil,
  atualizarPerfil,
  cadastrarUsuario
}