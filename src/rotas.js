const express = require('express');
const usuarios = require('./controladores/usuarios');
const login = require('./controladores/login');
const verificaLogin = require('./filtros/verificaLogin');
const postagens = require('./controladores/postagens')

const rotas = express();

//cadastro de usuario
rotas.post('/cadastro', usuarios.cadastrarUsuario);

//login
rotas.post('/login', login);

//verificar usuário logado
rotas.use(verificaLogin);

//ver e atualizar perfil
rotas.get('/perfil', usuarios.obterPerfil);
rotas.put('/perfil', usuarios.atualizarPerfil);

//postagens
rotas.post('/postagens', postagens.novaPostagem);
rotas.post('/postagens/:postagemId/curtir', postagens.curtir)
rotas.post('/postagens/:postagemId/comentar', postagens.comentar)
rotas.get('/postagens', postagens.feed)

module.exports = rotas