const knex = require('knex');
const jwt = require('jsonwebtoken');
const senhaHash = require('../senhaHash');

const verificaLogin = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json('Não autorizado.');
  }

  try {
    const token = authorization.replace('Bearer ', '').trim();

    const { id } = jwt.verify(token, senhaHash);

    const usuarioExistente = await knex('usuarios').where({ id }).first();

    if (!usuarioExistente) {
      return res.status(404).json('Token inválido.')
    }

    const { senha, ...usuario } = usuarioExistente;

    req.usuario = usuario;

    next();

  } catch (error) {
    return res.status(400).json(error.message)
  }
}

module.exports = verificaLogin