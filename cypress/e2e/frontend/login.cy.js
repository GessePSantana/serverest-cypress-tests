describe('Login', () => {
    
    it('deve acessar a página de login', () => {
        cy.visit('https://serverest.dev/login')
        cy.url().should('include', '/login')
    })

    it('deve fazer login com sucesso', () => {
        cy.visit('https://serverest.dev/login')
        cy.get('input[name="email"]').type('gesse@gmail.com')
        cy.get('input[name="password"]').type('Teste@123')
        cy.get('button[type="submit"]').click()
        cy.url().should('include', '/dashboard')
    })
})