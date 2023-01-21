import puppeteer, { Browser, PuppeteerLaunchOptions, ConnectOptions } from "puppeteer"
import JupiterRequest from "./lib/request"
import Scraper from "./lib/scraper"
import Navigator from "./lib/navigator"

class Jupiter {
    private browser: Browser
    
    constructor(browser: Browser) {
        this.browser = browser
    }

    public static async launch(options?: PuppeteerLaunchOptions): Promise<Jupiter> {
        const browser = await puppeteer.launch(options)
        return new Jupiter(browser)
    }

    public static async connect(options: ConnectOptions): Promise<Jupiter> {
        const browser = await puppeteer.connect(options)
        return new Jupiter(browser)
    }

    public async request(request: JupiterRequest): Promise<Scraper> {
        const context = await this.browser.createIncognitoBrowserContext()
        const page = await context.newPage()
        const navigator = new Navigator(page)
        
        return new Scraper(request, navigator)
    }
}