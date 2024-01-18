describe('Kalkulator BMI', () => {
  const testData = [
    { weight: '50.3', height: '190', expectedBMI: '13.93', expectedNote: 'NIEDOWAGA', expectedErrorMsg: '' },
    { weight: '80', height: '180', expectedBMI: '24.69', expectedNote: 'OK', expectedErrorMsg: '' },
    { weight: '120', height: '200', expectedBMI: '30.00', expectedNote: 'NADWAGA', expectedErrorMsg: '' },
  ];

  beforeEach(() => {
    cy.visit('127.0.0.1:5500');

    cy.title().should('eq', 'Kalkulator BMI')
  });

  it('should calculate BMI for different inputs', () => {
    testData.forEach((data) => {
      cy.get('#waga').type('{selectall}{backspace}').type(data.weight);
      cy.get('#wzrost').type('{selectall}{backspace}').type(data.height);
      cy.get('#submitBtn').click();

      cy.get('#bmi').should('have.text', data.expectedBMI);
      cy.get('#bmiNote').should('have.text', data.expectedNote);
      cy.get('#errorMsg').should('have.text', data.expectedErrorMsg);
    });
  });
});