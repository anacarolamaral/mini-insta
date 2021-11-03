# Mini Insta

## O que o usuário poderá fazer
- Login
- Cadastro
- Ver as informações do perfil dele
- Editar dados do perfil
- Ver postagens
  - Ver quantidade de curtidas
  - Ver comentários
- Curtir postagens
- Comentar postagem


## O que o usuário não poderá fazer
- Ver localização de postagens
- Ver pessoas que curtiram postagem
- Curtir comentário
- Comentar em outros comentários

---

## Endpoints

### Login -  POST

#### Dados enviados
-	Username
-	Senha

#### Dados retornados
-	Sucesso / erro
-	Token

#### Objetivos gerais
-	Validar username e senha
-	Buscar usuário no banco de dados
-	Verificar senha
-	Gerar token de autenticação
-	Retornar dados do usuário e token

---

### Cadastro - POST

#### Dados enviados
-	Username
-	senha

#### Dados retornados
-	Sucesso / erro

#### Objetivos gerais
-	Validar username e senha
-	Verificar se username já existe no banco de dados
-	Criptografar senha
-	Cadastrar o usuário no banco de dados
-	Retornar sucesso ou erro

---

### Perfil - GET

#### Dados enviados
-	Token (com id ou username)

#### Dados retornados
-	url foto
-	Nome
-	Username
-	Site
-	Bio
-	Email
-	Tel
-	Gênero

#### Objetivos gerais
-	Validar token do usuário
-	Buscar cadastro do usuário com informação do token
-	Retornar dados do usuário

---

### Salvar alterações no perfil - PUT

#### Dados enviados
-	Token (com id ou username)
-	url foto
-	Nome
-	Username
-	Site
-	Bio
-	Email
-	Tel
-	Gênero
-	senha

#### Dados retornados
-	Sucesso / erro

#### Objetivos gerais
-	Validar token do usuário
-	Buscar cadastro do usuário com informação do token
-	Exigir ao menos um campo para atualizar
-	Criptografar nova senha, se for informada
-	Verificar se email e username já existe no banco de dados, se forem informados
-	Atualizar o registro do usuário no banco de dados
-	Retornar sucesso ou erro

---

### Postagem - GET

#### Dados enviados
-	Token
-	Offset

#### Dados retornados
-	Postagens [ ]
-	Id
    - Foi curtido por mim 
    - Usuário
-	url foto
-	username
-	se é perfil oficial (boolean)
    - fotos []
    - quantidade de curtidas (int)
    - comentários []
-	username
-	texto
    - data

#### Objetivos gerais
-	Validar token do usuário
-	Buscar cadastro do usuário com informação do token
-	Retornar postagens de outras pessoas

---

### Postagem - POST

#### Dados enviados
-	Token
-	Texto
-	Fotos [ ]

#### Dados retornados
-	Sucesso ou erro

#### Objetivos gerais
-	Validar token do usuário
-	Buscar cadastro do usuário com informação do token
-	Exigir que seja informada ao menos uma foto no array
-	Cadastrar postagem no banco de dados para o usuário logado
-	Cadastrar fotos da postagem no banco de dados
-	Retornar sucesso ou erro

---

### Curtir - POST

#### Dados enviados
-	Token (com username ou id usuário)
-	id da postagem

#### Dados retornados
-	Sucesso / erro

#### Objetivos gerais
-	Validar token do usuário
-	Buscar cadastro do usuário com informação do token
-	Buscar o cadastro da postagem com id informado
-	Verificar se usuário já curtiu a postagem
-	Cadastrar a curtida da postagem no banco de dados
-	Retornar sucesso ou erro

---

### Comentar postagem - POST

#### Dados enviados
-	Token (com username ou id usuário)
-	id da postagem
-	Texto do comentário

#### Dados retornados
-	Sucesso ou erro

#### Objetivos gerais
-	Validar token do usuário
-	Buscar cadastro do usuário com informação do token
-	Validar texto
-	Buscar o cadastro da postagem com id informado
-	Cadastrar comentário
-	Retornar sucesso ou erro
