describe('Testes de Segurança', () => {

    it('não deve cadastrar produto sem token', () => {
        
        
        //Cadastra um produto com token inválido
        cy.request({
            method: 'POST',
            url: '/produtos',
            failOnStatusCode: false,
            body: {
                nome: `Produto sem token ${Date.now()}`,
                preco: 100,
                descricao: 'Teste de acesso sem autenticação',
                quantidade: 10
            }

        }).then((response) => {
            
            //Verifica se o produto sem token foi retornado com erro 401
            expect(response.status).to.eq(401)
            expect(response.body).to.have.property('message')
        })
    })

    it('não deve cadastrar produto com token inválido', () => {
        
        //Tenta cadastrar um produto usando um token inválido
        cy.request({
            method: 'POST',
            url: '/produtos',
            failOnStatusCode: false,
            headers: {
                authorization: 'token-invalido'
            },
            body: {
                nome: `Produto token inválido ${Date.now()}`,
                preco: 100,
                descricao: 'Teste de acesso com token inválido',
                quantidade: 10
            }

        }).then((response) => {
            
            //Verifica se o produto com token inválido foi retornado com erro 401
            expect(response.status).to.eq(401)
            expect(response.body).to.have.property('message')
        })
    })
})