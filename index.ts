import express from "express"
import puppeteer from "puppeteer"
import routes from "./routes"

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const options = (process.env.NODE_ENV === 'dev') ? {} : {
    headless: false,
    slowMo: 10,
    args: ['--start-maximized']
}

puppeteer.launch(options).then(async (browser) => {
    const context = await browser.createIncognitoBrowserContext()
    routes(app, context)

    app.listen(port, () => {
        console.log(`Successfully listening on port ${port}`)
    })
})