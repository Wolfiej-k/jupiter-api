import puppeteer from "puppeteer"
import App from "./lib/app" 

puppeteer.launch().then(async (browser) => {
    const port = 3000
    new App(port, browser)
})