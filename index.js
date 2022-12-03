import express from "express"
import puppeteer from "puppeteer"

const app = express()
const port = 3000

const options = (process.env.NODE_ENV === 'dev') ? {} : {
    headless: false,
    slowMo: 250,
    args: ['--start-maximized']
}

puppeteer.launch(options).then(browser => {
    const context = browser.createIncognitoBrowserContext()
    // TODO
})