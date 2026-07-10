describe('API de Usuários', () => {

    // Factory responsável por gerar uma nova massa de dados para cada usuário
    const gerarUsuario = () => ({
        nome: 'Gessé Santana',
        email: `gesse${Date.now()}@gmail.com`,
        password: 'Teste@123',
        administrador: 'true'
    })

    // Helper responsável por criar um usuário e retornar a resposta da API
    const criarUsuario = () => {
        const usuario = gerarUsuario()

        return cy.request('POST', '/usuarios', usuario)
    }

    it('deve criar um usuário', () => {

        // Preparação: gera os dados necessários para o cadastro
        const usuario = gerarUsuario()

        // Ação: envia a requisição para cadastrar o usuário
        return cy.request('POST', '/usuarios', usuario)
            .then((response) => {

                // Validação: confirma que o cadastro foi realizado com sucesso
                expect(response.status).to.eq(201)
                expect(response.body.message).to.eq(
                    'Cadastro realizado com sucesso'
                )
                expect(response.body).to.have.property('_id')
                expect(response.body._id).to.be.a('string')
            })
    })

    it('deve listar todos os usuários', () => {

        // Ação: solicita a lista de usuários cadastrados
        return cy.request('GET', '/usuarios')
            .then((response) => {

                // Validação: confirma a estrutura e os dados retornados
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('usuarios')
                expect(response.body.usuarios).to.be.an('array')
                expect(response.body).to.have.property('quantidade')
                expect(response.body.quantidade).to.be.a('number')
                expect(response.body.quantidade).to.eq(
                    response.body.usuarios.length
                )
            })
    })

    it('deve buscar um usuário por ID', () => {

        // Preparação: cria um usuário para obter um ID válido
        return criarUsuario()
            .then((responseCriacao) => {
                const usuarioId = responseCriacao.body._id

                // Ação: busca o usuário utilizando o ID criado
                return cy.request('GET', `/usuarios/${usuarioId}`)
            })
            .then((responseBusca) => {

                // Validação: confirma que o usuário correto foi retornado
                expect(responseBusca.status).to.eq(200)
                expect(responseBusca.body).to.have.property('_id')
                expect(responseBusca.body._id).to.be.a('string')
            })
    })

    it('deve atualizar um usuário', () => {

        // Preparação: define os novos dados que serão utilizados na atualização
        const usuarioAtualizado = {
            nome: 'Gessé do Prado Santana Atualizado',
            email: `gesse.atualizado${Date.now()}@gmail.com`,
            password: 'Teste@123',
            administrador: 'true'
        }

        // Preparação: cria um usuário para que ele possa ser atualizado
        return criarUsuario()
            .then((responseCriacao) => {
                const usuarioId = responseCriacao.body._id

                // Ação: atualiza os dados do usuário criado
                return cy.request(
                    'PUT',
                    `/usuarios/${usuarioId}`,
                    usuarioAtualizado
                ).then((responseAtualizacao) => {

                    // Validação: confirma que a API aceitou a atualização
                    expect(responseAtualizacao.status).to.eq(200)
                    expect(responseAtualizacao.body.message).to.eq(
                        'Registro alterado com sucesso'
                    )

                    // Ação complementar: busca novamente o usuário atualizado
                    return cy.request('GET', `/usuarios/${usuarioId}`)
                })
            })
            .then((responseBusca) => {

                // Validação: confirma que os novos dados foram persistidos
                expect(responseBusca.status).to.eq(200)
                expect(responseBusca.body.nome).to.eq(
                    usuarioAtualizado.nome
                )
                expect(responseBusca.body.email).to.eq(
                    usuarioAtualizado.email
                )
                expect(responseBusca.body.administrador).to.eq(
                    usuarioAtualizado.administrador
                )
            })
    })

    it('deve excluir um usuário', () => {

        // Preparação: cria um usuário para que ele possa ser excluído
        return criarUsuario()
            .then((responseCriacao) => {
                const usuarioId = responseCriacao.body._id

                // Ação: exclui o usuário criado
                return cy.request('DELETE', `/usuarios/${usuarioId}`)
                    .then((responseExclusao) => {

                        // Validação: confirma que a exclusão foi realizada
                        expect(responseExclusao.status).to.eq(200)
                        expect(responseExclusao.body.message).to.eq(
                            'Registro excluído com sucesso'
                        )

                        // Ação complementar: tenta buscar o usuário excluído
                        return cy.request({
                            method: 'GET',
                            url: `/usuarios/${usuarioId}`,
                            failOnStatusCode: false
                        })
                    })
            })
            .then((responseBusca) => {

                // Validação: confirma que o usuário não existe mais
                expect(responseBusca.status).to.eq(400)
                expect(responseBusca.body.message).to.eq(
                    'Usuário não encontrado'
                )
            })
    })

    it('deve retornar 400 ao buscar um usuário inexistente', () => {

        // Preparação: cria um usuário para obter um ID válido
        return criarUsuario()
            .then((responseCriacao) => {
                const usuarioId = responseCriacao.body._id

                // Preparação: exclui o usuário para tornar o ID inexistente
                return cy.request('DELETE', `/usuarios/${usuarioId}`)
                    .then((responseExclusao) => {

                        // Validação: confirma que o usuário foi excluído
                        expect(responseExclusao.status).to.eq(200)
                        expect(responseExclusao.body.message).to.eq(
                            'Registro excluído com sucesso'
                        )

                        // Ação: tenta buscar um usuário que não existe mais
                        return cy.request({
                            method: 'GET',
                            url: `/usuarios/${usuarioId}`,
                            failOnStatusCode: false
                        })
                    })
            })
            .then((responseBusca) => {

                // Validação: confirma o comportamento esperado para usuário inexistente
                expect(responseBusca.status).to.eq(400)
                expect(responseBusca.body.message).to.eq(
                    'Usuário não encontrado'
                )
            })
    })
})