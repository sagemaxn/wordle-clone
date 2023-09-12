// in index.ts the answer is mocked to be 'water' while process.env.NODE_ENV === 'development'

describe('Wordle Clone', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000'); // Adjust the URL to wherever your game is hosted locally
    });

    it('should win the game', () => {
        cy.get('[data-testid="key-W"]').click();
        cy.get('[data-testid="key-A"]').click();
        cy.get('[data-testid="key-T"]').click();
        cy.get('[data-testid="key-E"]').click();
        cy.get('[data-testid="key-R"]').click();
        cy.get('[data-testid="key-ENTER"]').click();

        // Adjust the selector to target the element that displays the win message.
        cy.get('[data-testid="win-alert"]').should('be.visible');
    });

    it('should lose the game', () => {
        // This test assumes you are entering the wrong guesses repeatedly until the game is lost.

        for (let i = 0; i < 6; i++) {
            cy.get('[data-testid="key-T"]').click();
            cy.get('[data-testid="key-H"]').click();
            cy.get('[data-testid="key-I"]').click();
            cy.get('[data-testid="key-N"]').click();
            cy.get('[data-testid="key-G"]').click();
            cy.get('[data-testid="key-ENTER"]').click();
        }

        // Adjust the selector to target the element that displays the loss message.
        cy.get('[data-testid="loss-alert"]').should('be.visible');
    });
});
