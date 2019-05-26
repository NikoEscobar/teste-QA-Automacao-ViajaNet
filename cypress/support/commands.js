Cypress.Commands.add("routeMainPage", () => {
  cy.route('POST', 'handlers/PluginHandler.ashx*')
    .as('pluginHandler')

  cy.route('POST', 'api/tracking**')
    .as('API_Tracking')

  cy.route('GET', 'https://securepubads.g.doubleclick.net/gampad/**')
    .as('securepubads_gampad')  
});

Cypress.Commands.add("routeResultPage", () => {
  cy.route('POST', 'resources/air/v2*')
    .as('air_V2')

  cy.route('GET', 'passagens-aereas/quandoviajar/api/cityPair/exist/CGH/PAR*')
    .as('cityPair')

  cy.route('POST', 'resources/api/Bubbles*')
    .as('bubbles')

  cy.route('POST', 'resources/api/HotelQuantityArrival*')
    .as('hotelQuantityArrival')

  cy.route('POST', 'price/city-pair-legacy*')
    .as('cityPairLegacy')

  cy.route('POST', 'price/prices-matrix*')
    .as('pricesMatrix')
});

Cypress.Commands.add("routeCheckoutPage", () => {
  cy.route('POST', 'resources/api/Checkout/Validation*')
    .as('checkoutValidation')

  cy.route('POST', 'resources/api/FareRules*')
    .as('fareRules')

  cy.route('POST', 'resources/api/Booking*')
    .as('booking')

  cy.route('POST', 'resources/api/orders/GetByHash*')
    .as('getByHash')

  cy.route('POST', 'resources/api/Insurance/Availability')
    .as('availability')

  cy.route('POST', 'collect*')
    .as('collect')
});

Cypress.Commands.add("FillAirlineTicketsSearch", mainPage => {
  cy.get('#inptdestination')
    .type(`${mainPage.destination.split(/\s+/).slice(0,2).join(' ')}`)
    .wait('@API_Tracking')
  
  cy.get('#ui-autocomplete')
    .should('contain', `${mainPage.destination}`)
    .contains(`${mainPage.destination}`)
    .click()

  cy.get('#departureDate')
    .click()

  cy.get(`.day-${mainPage.departureDate}`)
    .click()

  cy.wait('@API_Tracking')

  cy.get(`.day-${mainPage.arrivalDate}`)
    .click()
});

Cypress.Commands.add('closeAllNotifications', () => {
  cy.get('.cg-notify-close')
    .click({multiple:true})
});

Cypress.Commands.add('fillPassengerRegister', passenger => {
  cy.get('#nome_0')
    .type(`${passenger.name}`)

  cy.get('#lastName_0')
    .type(`${passenger.lastName}`)

  cy.get('#birth_0')
    .type(`${passenger.birth}`)

  cy.get('[name="gender_0"]')
    .select(`${passenger.gender}`)
});

Cypress.Commands.add('fillCreditCard', creditCard => {
  cy.get('#flag_card')
    .select(`${creditCard.cardFlag}`)

  cy.get('#number_card-0')
    .type(`${creditCard.cardNumber}`)

  cy.get('#month-0')
    .select(`${creditCard.month}`,{force:true})

  cy.get('#year-0')
    .select(`${creditCard.year}`)

  cy.get('#codesecure_card-0')
    .type(`${creditCard.secureCode}`)

  cy.get('#name_card-0')
    .type(`${creditCard.cardName}`)

  cy.get('#cpf_card-0')
    .type(`${creditCard.cardCPF}`)
});

Cypress.Commands.add('fillAddress', address => {
  cy.route('GET', `resources/api/location/GetAddressByCEP/${address.zipcode}*`)
    .as('getAddressByCEP')

  cy.get('#zipcode-0')
    .type(`${address.zipcode}`)
    .blur()
  
  cy.wait('@getAddressByCEP')

  cy.get('#number_address-0')
    .type(`${address.number}`)

  cy.get('#complement-0')
    .type(`${address.complement}`)
});

Cypress.Commands.add('fillContact', passenger => {
  cy.get('#contact_email')
    .type(`${passenger.email}`)

  cy.get('#contact_email_confirm')
    .type(`${passenger.email}`)

  cy.get('#contact_phonenumber_0')
    .type(`${passenger.phoneNumber}`)
});