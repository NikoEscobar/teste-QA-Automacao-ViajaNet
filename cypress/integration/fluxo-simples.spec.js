import dataMass,{mainPage, passenger, creditCard, address} from '../fixtures/dataMass'

context("Teste ViajaNet", () => {

  describe("Fluxo simples para compra de reserva", () => {
    it('Compra de reserva', () => {
      //route API flow
      cy.server()
      cy.routeMainPage()
      cy.routeResultPage()
      cy.routeCheckoutPage()

      //visit aplication main domain
      cy.visit('/')
      
      //close modal menu
      cy.get('.btn-close-modal').click()

      //wait for APIs 
      cy.wait('@pluginHandler')
      cy.wait('@API_Tracking')
      cy.wait('@securepubads_gampad')

      cy.FillAirlineTicketsSearch(mainPage)
      
      cy.contains('Pesquisar').click()

      //wait for APIs 
      cy.wait('@air_V2')
      cy.wait('@cityPair')
      cy.wait('@bubbles')
      cy.wait('@hotelQuantityArrival')
      cy.wait('@cityPairLegacy')
      cy.wait('@pricesMatrix')

      //close social-login menu
      cy.get('.social-login__btn-close').click()

      //close all notification pop up
      cy.closeAllNotifications()

      //keep the test flow on same tab
      cy.get('#checkoutform').invoke('removeAttr', 'target')

      cy.contains('Comprar').click()

      //wait for APIs 
      cy.wait('@checkoutValidation')
      cy.wait('@fareRules')
      cy.wait('@bubbles')

      //close all notification pop up
      cy.closeAllNotifications()

      cy.fillPassengerRegister(passenger)
      cy.fillCreditCard(creditCard)
      cy.fillAddress(address)
      cy.fillContact(passenger)
      
      cy.get('#accept-checkout').check()

      cy.contains("Finalizar compra").click()

      //wait for APIs
      cy.wait('@booking')
      cy.wait('@getByHash')
      cy.wait('@availability')
      cy.wait('@collect')

      //final assertion 
      cy.get('.in-progress').should('contain','Reserva em processamento.')
      
      cy.get('.message-intro').scrollIntoView()
      cy.wait(3000)
    });
  });
});