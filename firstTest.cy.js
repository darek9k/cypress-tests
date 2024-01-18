describe('BMI Calculator', () => {
  it('Open main page', () => {
    cy.visit('127.0.0.1:5500')

    cy.title().should('eq', 'Kalkulator BMI')

    cy.get('#waga').type('80')

    cy.get('#wzrost').type('190')

    cy.get('#submitBtn').click()

    cy.get('#bmi').should('have.text', '22.16')

    cy.get('#bmiNote').should('have.text', 'OK')

    cy.get('#errorMsg').should('be.empty')
})
})