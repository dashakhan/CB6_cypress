describe('SignUpus Page', () => {
    const newEmail = `howdyCow_${Date.now()}@gmail.com`

        it('SignUpus Page', () => {
        cy.visit('/');
        cy.get(`[name="companyName"]`).should('be.visible').type('HowdyINC')
        cy.get(`[name="firstName"]`).should('be.visible').type('Daria')
        cy.get(`[name="lastName"]`).should('be.visible').type('Khan')
        cy.get(`[name="email"]`).should('be.visible').type(newEmail)
        cy.get(`[name="password"]`).should('be.visible').type('333Test!')
        cy.get(`[type="submit"]`).should('be.visible').click()
        //cy.contains('Create Account').click()
    })
})