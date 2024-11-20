import * as userData from "./data/userData.js"
import {confirmEmailMsg} from "./data/userData.js";

describe('SIGN UP', () => {
    beforeEach(() => {
        cy.visit('/');
    })
    describe('SIGN UP - POSITIVE ', () => {
        it('verify user can sign up with all fields', () => {
            cy.signUp(userData.userCompanyName,
                userData.userFirstName,
                userData.userLastName,
                userData.newEmail,
                Cypress.env('password'))
            cy.contains(userData.confirmEmailMsg)
        })
    })

    describe('SIGN UP - NEGATIVE', () => {
        it.only("verify user can't sign up with empty fields", () => {
            cy.get(`[type="submit"]`).should('be.visible').click()
            cy.on('window:alert', (message) => {
                expect(message).to.eq(userData.emptyFieldErr)
                return true
            })
        })

        it("verify user can't sign up with invalid email format ", () => {
            cy.signUp(userData.userCompanyName,
                userData.userFirstName,
                userData.userLastName,
                userData.invalidFormatEmail,
                Cypress.env('password'))

            cy.on('window:alert', (message) => {
                expect(message).to.eq(userData.wrongEmailFormat)
                return true
            })
        })
    })
})