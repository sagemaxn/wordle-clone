import { aliasQuery } from '../utils/graphql-test-utils';

function enterWord(a: string, b: string, c: string, d: string, e: string) {
    cy.get('.chakra-container > :nth-child(2)')
        .trigger('keydown', {
            key: a,
        })
        .trigger('keydown', {
            key: b,
        })
        .trigger('keydown', {
            key: c,
        })
        .trigger('keydown', {
            key: d,
        })
        .trigger('keydown', {
            key: e,
        })
        .trigger('keydown', {
            key: 'Enter',
        });
}

describe('', () => {
    beforeEach(() => {
        cy.intercept('POST', 'http://localhost:4000/graphql', req => {
            aliasQuery(req, 'InDictionary');
        });
        cy.visit('http://localhost:3000/', {
            onBeforeLoad: win => {
                let nextData;

                Object.defineProperty(win, '__NEXT_DATA__', {
                    set(o) {
                        console.log('setting __NEXT_DATA__', o);
                        // here is our change to modify the injected parsed data
                        o.props.pageProps.answer.answer = 'there';
                        nextData = o;
                    },
                    get() {
                        return nextData;
                    },
                });
            },
        });
    });

    it('Works when you lose', () => {
        for (let i = 0; i < 6; i++) {
            enterWord('E', 'V', 'E', 'N', 'T');
            cy.wait('@gqlInDictionaryQuery')
                .its('response.body.data')
                .should('have.property', 'inDictionary');
        }
        cy.should('You lost');
    });
});
