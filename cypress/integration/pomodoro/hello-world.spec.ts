describe('Hello World!', function () {
    it('Show the hello world string', function () {
      cy.visit('/')

      cy
        .shadowGet('hello-world')
        .shadowFind('p')
        .shadowContains('Hello, World!')
  })
})
