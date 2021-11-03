const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: '6X4iN',
    database: 'mini_insta'
  }
});

module.exports = knex;