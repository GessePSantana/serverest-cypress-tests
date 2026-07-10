describe('API de Usuário', () => {

    let usuarioId //Variável para armazenar o ID do usuário criado

    it('deve criar um usuário', () => {

        //Cria um usuário
        cy.request('POST', '/usuarios', {
            nome: 'Gessé do Prado Santana',
            email: `gesse${Date.now()}@gmail.com`,
            password: 'Teste@123',
            administrador: 'true'

        }).then((response) => {

            //Verifica se o usuário foi criado com sucesso
            expect(response.status).to.eq(201)
            expect(response.body.message).to.eq('Cadastro realizado com sucesso')
            expect(response.body).to.have.property('_id')

            //ID do usuário atribuido a variável usuarioId
            usuarioId = response.body._id
        })
    })

    it('deve listar todos os usuários', () => {

        //Lista todos os usuários
        cy.request('GET', '/usuarios').then((response) => {

            //Verifica se a lista de usuários foi retornada com sucesso
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('usuarios')
            expect(response.body.usuarios).to.be.an('array')
        })
    })

    it('deve buscar um usuário por ID', () => {

        //Busca um usuário por ID
        cy.request('GET', `/usuarios/${usuarioId}`).then((response) => {

            //Verifica se o usuário foi encontrado com sucesso
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('_id')
            expect(response.body._id).to.eq(usuarioId)
        })
    })

    it('deve atualizar um usuário', () => {

        //Atualiza um usuário
        cy.request('PUT', `/usuarios/${usuarioId}`, {
            nome: 'Gessé do Prado Santana',
            email: `gesse.atualizado${Date.now()}@gmail.com`,
            password: 'Teste@123',
            administrador: 'true'

        }).then((response) => {

            //Verifica se o usuário foi atualizado com sucesso
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq('Registro alterado com sucesso')

            // Busca o usuário novamente para confirmar que os dados atualizados estão corretos
            cy.request('GET', `/usuarios/${usuarioId}`).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.nome).to.eq(nomeAtualizado)
                expect(response.body.email).to.eq(emailAtualizado)
            })
        })
    })

    it('deve deletar um usuário', () => {

        //Deleta um usuário
        cy.request('DELETE', `/usuarios/${usuarioId}`).then((response) => {

            //Verifica se o usuário foi deletado com sucesso
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq('Registro excluído com sucesso')
        })
    })

    it('usuario inexistente deve retornar 404', () => {

        //Busca um usuário inexistente
        cy.request({
            method: 'GET',
            url: `/usuarios/${usuarioId}`,
            failOnStatusCode: false

        }).then((response) => {

            //Verifica se o usuário inexistente foi retornado com erro 404
            expect(response.status).to.eq(404)
            expect(response.body.message).to.eq('Usuário não encontrado')
        })
    })

})