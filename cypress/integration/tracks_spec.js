describe('Tracks should', function () {

  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('be of the rock genre', function () {
    cy.get(':nth-child(1) > .ant-card-body').contains('rock')
    cy.get(':nth-child(2) > .ant-card-body').contains('rock')
    cy.get(':nth-child(3) > .ant-card-body').contains('rock')
  })

  it('be alphabetical', function () {
    cy.get('.ant-card-head-title').first().contains('Elation Eve')
    cy.get('.ant-card-head-title').eq(1).contains('Home In The Sun')
    cy.get('.ant-card-head-title').eq(2).contains('Shine Bright')
  })
})