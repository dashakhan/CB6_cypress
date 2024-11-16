describe('LOGIN PAGE', () => {
    before(() =>{
        cy.visit('/user/login');
    })

    it('should login with valid credentials', () => {
        cy.get(`[name="email"]`).should('be.visible').type(Cypress.env('email'))
        cy.get(`[name="password"]`).should('be.visible').type(Cypress.env('password'))
        cy.get(`[type="submit"]`).should('be.visible').click()
        cy.contains('Daria Khan').should('be.visible')
        //cy.contains('Create Account').click()
    })
})