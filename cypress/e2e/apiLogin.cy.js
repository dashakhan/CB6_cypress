import mockResponse from "../fixtures/authMockResponse.json"


describe('API LOGIN ', () => {
    it("API LOGIN POSITIVE", () => {
        cy.apiLogin(Cypress.env("email"), Cypress.env("password")).then((response) => {
            window.localStorage.setItem('token', response.body.payload.token);
            window.localStorage.setItem('userId', response.body.payload._id);

            cy.log(JSON.stringify(response.body));
            expect(response.status).to.eq(200);
            expect(response.body.message).to.equal("Auth success");
        })
        cy.visit('/client');
    })


    describe('API LOGIN NEGATIVE', () => {
        it("api login invalid email", () => {
            cy.apiLogin("invalid@ww.hh", Cypress.env("password")).then((response) => {

                expect(response.status).to.eq(400);
                expect(response.body.message).to.equal("Auth failed");
            })
            cy.visit('/client');
        })
    })


    describe('API LOGIN WITH MOCK', () => {
        it("mock with API login", () => {
            cy.intercept("POST", 'https://clientbase-server-edu-dae6cac55393.herokuapp.com/v6/user/login', mockResponse)
            cy.apiLogin(Cypress.env("email"), Cypress.env("password")).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.message).to.equal("Auth success");
            })
        })

        it.only("mock with UI login", () => {
            cy.intercept("POST", 'https://clientbase-server-edu-dae6cac55393.herokuapp.com/v6/user/login', mockResponse).as('mockedLogin')
            cy.visit('user/login')

            cy.loginViaUI(Cypress.env("email"), Cypress.env("password"))

            cy.wait('@mockedLogin').then(res => {
                cy.wrap(res).its('response.statusCode').should('equal', 200);
                cy.wrap(res).its('response.body.message').should('include', 'Auth success');
                cy.wrap(res).its('response.body').should('have.property', 'silent')

            })
        })
    })
})