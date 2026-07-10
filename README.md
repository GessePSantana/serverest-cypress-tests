# ServeRest Cypress Tests

Projeto de automação de testes web e API desenvolvido com Cypress e JavaScript para validar funcionalidades da aplicação ServeRest.

O projeto contempla testes de login, cadastro de usuários, operações de CRUD pela API e validações de segurança relacionadas à autenticação.

## Objetivo

O objetivo deste projeto é demonstrar a construção de testes automatizados utilizando boas práticas de desenvolvimento, organização de cenários, geração dinâmica de massa de dados e assertivas claras.

## Tecnologias utilizadas

- JavaScript
- Cypress
- Node.js
- npm
- Git
- ServeRest

## Aplicações testadas

### Frontend

```text
https://front.serverest.dev
```

### API

```text
https://serverest.dev
```

## Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

- Node.js
- npm
- Git

Para verificar se as ferramentas estão instaladas:

```bash
node --version
npm --version
git --version
```

## Instalação

Clone o repositório:

```bash
git clone https://github.com/GessePSantana/serverest-cypress-tests.git
```

Acesse a pasta do projeto:

```bash
cd serverest-cypress-tests
```

Instale as dependências:

```bash
npm install
```

## Execução dos testes

### Modo interativo

Para abrir o Cypress e selecionar os testes manualmente:

```bash
npx cypress open
```

### Modo headless

Para executar todos os testes pelo terminal:

```bash
npx cypress run
```

### Execução de um arquivo específico

Exemplo para executar somente os testes da API de usuários:

```bash
npx cypress run --spec "cypress/e2e/usuario.cy.js"
```

Exemplo para executar somente os testes de login:

```bash
npx cypress run --spec "cypress/e2e/login.cy.js"
```

Exemplo para executar somente os testes de segurança:

```bash
npx cypress run --spec "cypress/e2e/seguranca.cy.js"
```

## Cenários automatizados

### Testes web

- Acesso à página de login
- Validação dos elementos da tela de login
- Cadastro de um novo usuário
- Login com credenciais válidas
- Login com usuário inválido
- Login com senha inválida
- Validação dos campos obrigatórios

### Testes da API de usuários

- Cadastro de usuário
- Listagem de usuários
- Busca de usuário por ID
- Atualização de usuário
- Validação dos dados atualizados
- Exclusão de usuário
- Validação da exclusão
- Busca de usuário inexistente

### Testes de segurança

- Tentativa de cadastro de produto sem token
- Tentativa de cadastro de produto com token inválido
- Validação do código de status HTTP
- Validação da mensagem retornada pela API

## Estrutura do projeto

```text
serverest-cypress-tests/
├── cypress/
│   ├── e2e/
│   │   ├── login.cy.js
│   │   ├── usuario.cy.js
│   │   └── seguranca.cy.js
│   ├── fixtures/
│   └── support/
│       ├── commands.js
│       └── e2e.js
├── cypress.config.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Boas práticas aplicadas

- Separação dos testes por funcionalidade
- Testes independentes entre si
- Geração dinâmica de massa de dados
- Utilização de funções auxiliares
- Redução de duplicação de código
- Uso de seletores `data-testid` quando disponíveis
- Validação de status HTTP
- Validação do corpo das respostas
- Validação de mensagens retornadas pela aplicação
- Utilização de `failOnStatusCode: false` em cenários negativos
- Validação dos dados após operações de atualização
- Validação da inexistência do usuário após a exclusão
- Organização dos cenários em preparação, ação e validação
- Nomes de testes claros e descritivos

## Massa de dados

Os usuários utilizados nos testes são gerados dinamicamente durante a execução.

Exemplo:

```javascript
const gerarUsuario = () => ({
    nome: 'Gessé Santana',
    email: `gesse${Date.now()}@gmail.com`,
    password: 'Teste@123',
    administrador: 'true'
})
```

A geração dinâmica do e-mail evita conflitos com usuários cadastrados em execuções anteriores.

## Organização dos cenários

Os testes seguem a estrutura:

1. Preparação dos dados necessários
2. Execução da ação
3. Validação do resultado esperado

Exemplo:

```javascript
it('deve buscar um usuário por ID', () => {

    // Preparação: cria um usuário para obter um ID válido
    criarUsuario().then((responseCriacao) => {
        const usuarioId = responseCriacao.body._id

        // Ação: busca o usuário pelo ID
        cy.request('GET', `/usuarios/${usuarioId}`)
            .then((responseBusca) => {

                // Validação: confirma que o usuário correto foi retornado
                expect(responseBusca.status).to.eq(200)
                expect(responseBusca.body._id).to.eq(usuarioId)
            })
    })
})
```

## Assertivas

As assertivas verificam tanto o código de status HTTP quanto o conteúdo retornado pela aplicação.

Exemplo de cenário positivo:

```javascript
expect(response.status).to.eq(201)
expect(response.body.message).to.eq(
    'Cadastro realizado com sucesso'
)
expect(response.body).to.have.property('_id')
```

Exemplo de cenário negativo:

```javascript
expect(response.status).to.eq(400)
expect(response.body.message).to.eq(
    'Usuário não encontrado'
)
```

## Observações

Os dados utilizados neste projeto são exclusivamente para fins de teste.

Não são utilizadas credenciais reais, tokens de produção ou dados pessoais de clientes.

A aplicação ServeRest é um ambiente público destinado à prática de testes web e API.

## Autor

Desenvolvido por **Gessé do Prado Santana**.

GitHub: [GessePSantana](https://github.com/GessePSantana)