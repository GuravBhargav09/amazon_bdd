import {Before, BeforeAll, After, AfterAll, setDefaultTimeout} from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium, firefox, webkit } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import path from "path";
const fs = require('fs-extra');

setDefaultTimeout(20000);

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
    browser = await chromium.launch({headless: false, args: ["--start-maximized"]});
    console.log("Beforeall executed");
    console.log(process.env.npm_config_TAGS);
})

Before(async function () {
    context = await browser.newContext({
        viewport: null,
        
        recordVideo : {
            dir : "./test-results/video/"
        }
    });
    await context.clearCookies();

    const page = await context.newPage();
    pageFixture.page = page;
})

After(async function({pickle}){
    let img: Buffer;
    // let videoPath: string | undefined;

    img = await pageFixture.page.screenshot({path: `./test-results/screenshots/${pickle.name}.png`, type: 'png'});
    // videoPath = await pageFixture.page.video()?.path();
    await this.attach(img, 'image/png');
    // await this.attach(
    //     fs.readFileSync(videoPath),
    //     'video/webm'
    // );
    await pageFixture.page.close();
    await context.close();
})
AfterAll(async function(){
    await browser.close();
})




