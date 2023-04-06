import { CounterComponent } from './counter.component';

it('initially shows 0', () => {
  cy.mount(CounterComponent);
  cy.get('[data-cy=counter-button]').should('contain', '0');
});

it('increments count on click', () => {
  cy.mount(CounterComponent);

  cy.get('[data-cy=counter-button]').should('contain', '0');

  cy.get('[data-cy=counter-button]').click();
  cy.get('[data-cy=counter-button]').should('contain', '1');

  cy.get('[data-cy=counter-button]').click();
  cy.get('[data-cy=counter-button]').click();
  cy.get('[data-cy=counter-button]').click();
  cy.get('[data-cy=counter-button]').should('contain', '4');
});
