import express, {Request, Response} from "express"
import {Browser} from "puppeteer"
import Student from "./models/student"
import Scraper from "./scraper"

class App {
    public app
    public port
    public browser

    constructor(port: number, browser: Browser) {
        this.app = express()
        this.port = port
        this.browser = browser
        this.initialize()
        this.routes()
    }

    private initialize(): void {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.listen(this.port, () => {
            console.log(`Successfully listening on port ${this.port}`)
        })
    }

    private routes(): void {
        this.app.get('*', (req: Request, res: Response) => {
            console.log(`Get request: ${req.body}`)
            res.send('404: Forbidden')
        })

        this.app.post('/student', async (req: Request, res: Response) => {
            console.log(`Post request to /student: ${req.body.id}`)
            res.send(JSON.stringify(await this.scrape(req.body)))
        })
    }

    public async scrape(body: Record<string, string>): Promise<Student> {
        const context = await this.browser.createIncognitoBrowserContext()
        const page = await context.newPage()
        const scraper = new Scraper(body, page)

        return await scraper.data()
    }
}

export default App  
