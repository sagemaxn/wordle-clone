import { aliasQuery, aliasMutation, hasOperationName } from '../utils/graphql-test-utils'

describe('Correct answer passes', () => {
  beforeEach(() => {
    cy.intercept('POST', 'http://localhost:4000/graphql', (req) => {
      aliasQuery(req, 'InDictionary')
    })
    cy.visit('http://localhost:3000/', {
      onBeforeLoad: (win) => {
        let nextData
  
        Object.defineProperty(win, '__NEXT_DATA__', {
          set(o) {
            console.log('setting __NEXT_DATA__', o)
            // here is our change to modify the injected parsed data
            o.props.pageProps.answer.answer = 'words'
            nextData = o
          },
          get() {
            return nextData
          },
        })
      },
    })
  })

  it('Should Check Word Exists', () => {

    cy.get('.chakra-container > :nth-child(2)').trigger('keydown', {
      key: 'L',
    }).trigger('keydown', {
      key: 'O',
    })
    .trigger('keydown', {
      key: 'R',
    })
    .trigger('keydown', {
      key: 'D',
    })
    .trigger('keydown', {
      key: 'S',
    })
    .trigger('keydown', {
      key: 'Enter',
    })
    

    cy.wait('@gqlInDictionaryQuery')
    .its('response.body.data')
    .should('have.property', 'inDictionary')
  })
});