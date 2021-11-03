const express = require('express');
const usuarios = require('./controladores/usuarios');
const login = require('./controladores/login');
const verificaLogin = require('./filtros/verificaLogin');

const rotas = express();

//cadastro de usuario
rotas.post('/cadastro', usuarios.cadastrarUsuario);

//login
rotas.post('/login', login.login);

//verificar usuário logado
rotas.use(verificaLogin);

//ver e atualizar perfil
rotas.get('/perfil', usuarios.obterPerfil);
rotas.put('/perfil', usuarios.atualizarPerfil);

//postagens

module.exports = rotas