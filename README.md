# cypress-tests

Simple tests in Cypress for BMI Calculator.
Source of the calculator from the "Become a Manual Tester" course via to.twoje-kursy.pl
All you need is Visual Code Studio + LiveServer and you can have fun.

### firstTest.cy.js

We go to the website: 127.0.0.1:5500, our live server works here.

```
cy.visit('127.0.0.1:5500')
```

We check whether the page title is correct:

cy.title().should('eq', 'BMI Calculator')

```
cy.title().should('eq', 'Kalkulator BMI')
```

more precisely, whether it is equal.

Then, after id (CSS), we find our required fields and button

#waga
#wzrost
#submitBtn

```
cy.get('#waga').type('80')

cy.get('#wzrost').type('190')

cy.get('#submitBtn').click()
```

etc.

then we check the correctness of the field results:

#bmi
#bmiNote
#errorMsg

```
cy.get('#bmi').should('have.text', '22.16')

cy.get('#bmiNote').should('have.text', 'OK')

cy.get('#errorMsg').should('be.empty')
```

### ParametrizedTest.cy.js

Parameterized test.
It makes our code easier and more efficient by providing an array of data to check. Thanks to this, we can check a large amount of data from testing techniques during one test.

Array structure - JSON style.

First we define "base"

```
describe('Kalkulator BMI', () => {
  const testData = [
    { weight: '50.3', height: '190', expectedBMI: '13.93', expectedNote: 'NIEDOWAGA', expectedErrorMsg: '' },
    { weight: '80', height: '180', expectedBMI: '24.69', expectedNote: 'OK', expectedErrorMsg: '' },
    { weight: '120', height: '200', expectedBMI: '30.00', expectedNote: 'NADWAGA', expectedErrorMsg: '' },
  ];
```

key, value - As in the JSON construct.


Then, as in the case of the Selenium and Java libraries, we can introduce an action that will happen before each test
```
beforeEach(() => {
    cy.visit('127.0.0.1:5500');

    cy.title().should('eq', 'Kalkulator BMI')
});
```

Now we run our test for each data set.
The structure resembles the lambda from Java. Even lambda in lambda.

When asked why, we enter the `.type` command twice into the fields
`{selectall}{backspace}` selects the box and removes it. Therefore, before entering data from the table, we are sure that the field is empty :)

```
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
```

That's all. If you made it to this point, I give you a high five :) Have a nice day!
