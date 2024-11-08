Feature: visit amazon.in website

    Background: given first step
        Given user goes to amazon.in website

    @visit
    Scenario: user goes to amazon website
    Then he sees the title of homepage to be "Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in" 

    @login
    Scenario: user log in 
    And user hovers on account tab 
    And user clicks on sign-in button 
    And user enters email "bhargavmonstergurav@gmail.com" and click continue
    Then user enters password "Bhargav@2002" and clicks sign-in
    Then user should get otp window

