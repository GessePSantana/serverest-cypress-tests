describe('Login', () => {

    const usuario = {
        nome: 'Gessé Santana',
        email: `gesse${Date.now()}@gmail.com`,
        password: '1234'
    }

    beforeEach(() => {

        //Acessa a página de login
        cy.visit('https://front.serverest.dev/login')


    })

    it('deve acessar a página de login', () => {

        cy.url().should('include', '/login')

        //Verifica se os elementos da página de login estão visíveis
        cy.get('.font-robot').should('be.visible')
        cy.get('[data-testid="email"]').should('be.visible')
        cy.get('[data-testid="senha"]').should('be.visible')
    })

    it('deve cadastrar um novo usuário', () => {


        cy.get('[data-testid="cadastrar"]').click()

        //Preenche o formulário de cadastro e envia
        cy.get('[data-testid="nome"]').type(usuario.nome)
        cy.get('[data-testid="email"]').type(usuario.email)
        cy.get('[data-testid="password"]').type(usuario.password)
        cy.get('[data-testid="checkbox"]').check()

        //Cadastrar usuário
        cy.get('[data-testid="cadastrar"]').click()

        //Direcionar para a tela de login
        cy.get('[data-testid="entrar"]').click()

        //Preenche o formulário de login e envia
        cy.get('input[name="email"]').type(usuario.email)
        cy.get('input[name="password"]').type(usuario.password)
        cy.get('button[type="submit"]').click()

        cy.get('#navbarTogglerDemo01').should('be.visible')

    })

    it('deve exibir mensagem de erro ao tentar logar com usuário inválido', () => {

        //Preenche o formulário de login com usuário inválido e envia
        cy.get('input[name="email"]').type('invalid@email.com')
        cy.get('input[name="password"]').type('Invalid@123')
        cy.get('button[type="submit"]').click()

        cy.get('.alert').should('be.visible')
    })

    it('deve exibir mensagem de erro ao tentar logar com senha inválida', () => {

        //Preenche o formulário de login com senha inválida e envia
        cy.get('input[name="email"]').type(usuario.email)
        cy.get('input[name="password"]').type('Invalid@123')
        cy.get('button[type="submit"]').click()

        cy.get('.alert').should('be.visible')
    })

    it('deve exibir mensagem de erro ao tentar logar com campos vazios', () => {

        //Preenche o formulário de login com campos vazios e envia
        cy.get('button[type="submit"]').click()

        cy.contains('Email é obrigatório').should('be.visible')
        cy.contains('Password é obrigatório').should('be.visible')
    })
})