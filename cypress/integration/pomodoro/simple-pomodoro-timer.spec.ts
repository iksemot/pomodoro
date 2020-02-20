describe('Pomodoro Timer', function () {
  beforeEach(function ( ) {
    cy.clock()
    cy.visit('/')
  })

  it('Is placed on the home page', function () {
      cy
        .shadowGet('pomodoro-timer')
  })

  it('Reads 25m 00s', function () {
    cy
      .shadowGet('pomodoro-timer')
      .shadowContains('25m 00s')
  })

  it('Changes to 24m 59s after 1 second', function () {
    cy
      .shadowGet('pomodoro-timer')
      .shadowContains('25m 00s')

    cy.tick(1000)

    cy
      .shadowGet('pomodoro-timer')
      .shadowContains('24m 59s')
  })

  it('Changes to 00m 00m after 25 minutes', function () {
    cy
      .shadowGet('pomodoro-timer')
      .shadowContains('25m 00s')

    cy.tick(25 * 60 * 1000)

    cy
      .shadowGet('pomodoro-timer')
      .shadowContains('00m 00s')
  })

  it('Does not change if the enabled is false', function () {
    cy.tick(1 * 60 * 1000)

    cy
      .shadowGet('pomodoro-timer')
      .invoke('attr', {'enabled': false})
      .shadowContains('24m 00s')

    cy.tick(1 * 60 * 1000)

    cy
      .shadowGet('pomodoro-timer')
      .shadowContains('24m 00s')
  })

  it('Starts counting if the attribute enabled changes to true', function () {
    cy.tick(1 * 60 * 1000)

    cy
      .shadowGet('pomodoro-timer')
      .invoke('attr', {'enabled': false})
      .shadowContains('24m 00s')

    cy.tick(1 * 60 * 1000)

    cy
      .shadowGet('pomodoro-timer')
      .shadowContains('24m 00s')
      .invoke('attr', {'enabled': true})

    cy.tick(1 * 60 * 1000)

    cy
      .shadowGet('pomodoro-timer')
      .shadowContains('24m 00s')
  })
})
