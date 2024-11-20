import * as userData from "./data/userData.js"

describe('LOGIN PAGE', () => {
    beforeEach(() => {
        cy.visit('/user/login');
    })
    describe('LOGIN PAGE - POSITIVE', () => {
        it('should login with valid credentials', () => {
            cy.loginViaUI(Cypress.env('email'),Cypress.env('password'))
            cy.contains(userData.userFullName).should('be.visible')
            cy.get(`[class="dropdown-toggle nav-link"]`).should('contain.text', userData.userFullName)
        })
    })
    describe.only('LOGIN PAGE - NEGATIVE', () => {
        it('should not login with empty fields', () => {
            cy.get(`[type="submit"]`).should('be.visible').click()
            cy.on('window:alert', (message)=>{
                expect(message).to.eq(userData.emptyFieldErr)
                return true
            })
        })

        it("should not login without password field is empty", () => {
            cy.get(`[name="password"]`).type(Cypress.env('password'))
            cy.get(`[type="submit"]`).click()
            cy.on('window:alert', (message)=>{
                expect(message).to.eq(userData.emptyFieldErr)
                return true
            })
        })

        it('should not login with invalid credentials', () => {
            cy.loginViaUI(userData.notExistingEmail, userData.invalidPassword)
            cy.contains(userData.userFullName).should('not.exist')
            cy.contains(userData.authErrMsg).should('be.visible')
            cy.get(`[class="ant-notification-notice-message"]`).should('contain.text', userData.authErrMsg)
        })

        it('should not login with email wrong format', () => {
            cy.loginViaUI(userData.invalidFormatEmail, Cypress.env('password'))
            cy.contains(userData.userFullName).should('not.exist')
            cy.on('window:alert', (message)=>{
                expect(message).to.eq(userData.wrongEmailFormat)
                return true
            })
        })
    })
})