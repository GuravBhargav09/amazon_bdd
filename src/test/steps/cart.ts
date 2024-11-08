import {Given, When, Then, setDefaultTimeout} from '@cucumber/cucumber';
import { pageFixture } from '../../Hooks/pageFixture';
import { expect } from '@playwright/test';

// mobile tab //a[contains(text(), "Mobiles")]
// mobile item //li[@id="sobe_d_b_ms_23_4"]
setDefaultTimeout(20000);

When('user clicks mobile tab and click on one mobile', async function(){
 await pageFixture.page.click('//a[contains(text(), "Mobiles")]');
//  await pageFixture.page.waitForTimeout(1000);
 await pageFixture.page.click('//li[@id="sobe_d_b_ms_23_4"]');

})

When('user press add to cart', async function() {
    // await pageFixture.page.locator('//div[@id="a-accordion-auto-9"]//input[@id="add-to-cart-button"]').waitFor({
    //     state: "visible"
    // });
    await pageFixture.page.click('//div[@id="a-accordion-auto-9"]//input[@id="add-to-cart-button"]');

})

Then('user should get confirmation of adding element to cart', async function(){
    await pageFixture.page.getByRole('heading', {name: 'Added to cart'}).waitFor({
        state: "visible"
    });
    try {
    await expect(pageFixture.page.getByRole('heading', {name: 'Added to cart'})).toBeVisible();
        
    } catch (error) {
        console.log("Got error " + error);
    }
})

When("user clicks on Todays deal tab", async function(){
    await pageFixture.page.click('//a[contains(text(), "Today\'s Deals")]');
})

When('user clicks on any mobile and add it to cart', async function(){
    await  pageFixture.page.click('//div[@data-testid="product-card"]');
    await pageFixture.page.click('//div[@id="a-accordion-auto-9"]//input[@id="add-to-cart-button"]');
    await pageFixture.page.getByRole('heading', {name: 'Added to cart'}).waitFor({
        state: "visible"
    });
    try {
    await expect(pageFixture.page.getByRole('heading', {name: 'Added to cart'})).toBeVisible();
    } catch (error) {
        console.log("Got error " + error);
    }
    if(await pageFixture.page.locator('//a[@id="attach-close_sideSheet-link"]').first().isVisible())
        await pageFixture.page.locator('//a[@id="attach-close_sideSheet-link"]').first().click();
})

When('user clicks on fashion tab and clicks on shoes image', async function(){
    await pageFixture.page.click('//a[contains(text(), "Fashion")]');
    await pageFixture.page.click('//li[@id="sobe_d_b_ms_11_2"]');

})

When('user add some shoes in the cart', async function(){
    try{
        await pageFixture.page.locator('//button[contains(@id, "a-autoid")]').nth(0).click();
        await pageFixture.page.locator('//div[@id="a-popover-2"]').waitFor({state: "visible"});
    }catch(error){
        console.log("error found while waiting for popup " + error);
    }

    await pageFixture.page.selectOption('//select[@name="atc-desktop-dropdown"]', {label: '8 UK'});
    await pageFixture.page.locator('//div[@id="a-popover-content-2"]//button[contains(text(), "Add to cart")]').nth(1).click();
    await pageFixture.page.waitForTimeout(2000);
})

Then('user clicks on the cart button', async function(){
    await pageFixture.page.locator('//span[@id="nav-cart-count"]').click();
    // await pageFixture.page.waitForTimeout(3000);
    // await expect(pageFixture.page.locator('//input[@name="proceedToRetailCheckout"]')).toBeVisible();
    await expect(pageFixture.page).toHaveTitle('Amazon.in Shopping Cart');
    await pageFixture.page.waitForTimeout(1000);

    const allQuantity = await pageFixture.page.locator('//div[@data-csa-c-owner="CartX"]//span[contains(@class, "a-dropdown-prompt")]').allInnerTexts();
    await pageFixture.page.waitForTimeout(1000);
    const allPrices = await pageFixture.page.locator('//div[@data-csa-c-owner="CartX"]//div[@class="sc-badge-price-to-pay"]//span[contains(@class, "sc-product-price")]').allInnerTexts();
    await pageFixture.page.waitForTimeout(1000);
    
    console.log(allQuantity, allPrices);
    var total : number = 0, quantTotal : number = 0;
    for(let i=0; i<allPrices.length; i++){
        total += (Number(allQuantity[i]) * Number(allPrices[i]));
        quantTotal += Number(allQuantity[i]);
    }

    console.log(total, quantTotal);
    await pageFixture.page.waitForTimeout(1000);

    let totalQuantityString : string = await pageFixture.page.locator('//span[@id="sc-subtotal-label-buybox"]').innerText();
    await pageFixture.page.waitForTimeout(1000);

    let Quantity : number = await Number(totalQuantityString.split('(')[1].split(' ')[0]);
    await pageFixture.page.waitForTimeout(1000);

    let totalSum = await (pageFixture.page.locator('//span[@id="sc-subtotal-amount-buybox"]//span[contains(@class, "sc-price")]').textContent());
    console.log(Quantity, totalSum);

    // await expect(totalSum).toBe(total);


    await expect(Quantity).toBe(quantTotal);

    // try{
    // }catch(error){
    //     console.log("Total sum didn't match. " + error);
    // }
    // try{
    // }catch(error){
    //     console.log("Total quantity didn't match. " + error);
    // }


})
    

