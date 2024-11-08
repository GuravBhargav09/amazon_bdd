import {When, Then, Given, setDefaultTimeout} from "@cucumber/cucumber";
import { pageFixture } from "../../Hooks/pageFixture";
import { expect } from "@playwright/test";
setDefaultTimeout(20000);

Given('user goes to amazon.in website', async function(){
    await pageFixture.page.goto('https://amazon.in');
    console.log("Visited the website");
})

Then('he sees the title of homepage to be {string}', async function (titleToAssert: string) {
    await console.log(pageFixture.page.title());
    await expect(pageFixture.page).toHaveTitle(titleToAssert);

})

When('user hovers on account tab', async function() {
 await pageFixture.page.hover('//a[@id="nav-link-accountList"]');
})

When('user clicks on sign-in button', async function() {
    await pageFixture.page.click('//a[@data-nav-role="signin"]//span[@class="nav-action-inner"]');
})

When('user enters email {string} and click continue', async function(email: string){
    await pageFixture.page.waitForTimeout(2000);
    await pageFixture.page.locator('//input[@id="ap_email"]').fill(email);
    await pageFixture.page.click('//input[@type="submit"]');

})

Then('user enters password {string} and clicks sign-in', async function(pass: string){
    await pageFixture.page.locator('//input[@id="ap_password"]').fill(pass);
    await pageFixture.page.click('//input[@type="submit"]');
})

Then('user should get otp window', async function() {
    await expect(pageFixture.page.locator('//a[contains(text(), "Resend code")]')).toBeVisible();
})
