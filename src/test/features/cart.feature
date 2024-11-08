Feature: validate cart features 

    Background: given first step
        Given user goes to amazon.in website 

    @addToCart
    Scenario: adding to cart an item
        When user clicks mobile tab and click on one mobile
        When user press add to cart
        Then user should get confirmation of adding element to cart

    @validateTotal
    Scenario: validate total amount of cart
        When user clicks on Todays deal tab 
        And user clicks on any mobile and add it to cart
        And user clicks on fashion tab and clicks on shoes image
        And user add some shoes in the cart 
        Then user clicks on the cart button
        # Then totoal amount at the bottom and at the side should be same
