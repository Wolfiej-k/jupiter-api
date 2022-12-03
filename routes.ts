import {Express, Request, Response} from "express"
import {BrowserContext} from "puppeteer"

export default async function routes(app: Express, context: BrowserContext) {
    app.get('*', (req: Request, res: Response) => {
        res.send('404: Forbidden')
    })

    app.post('/student', async (req: Request, res: Response) => {
        const page = await context.newPage()
        await page.goto('https://login.jupitered.com/login/')
        await page.waitForNavigation({waitUntil: 'networkidle2'})

        console.log(`Post request to /student: ${JSON.stringify(req.body)}`)
    
        await page.type('#text_studid1', req.body['id'])
        await page.type('#text_password1', req.body['password'])
        await page.type('#text_school1', req.body['school'])
        await page.type('#text_city1', req.body['city'])
        await page.$eval('input[name=region1]', (el: any, state: string) => el.value = state, req.body['state'])
        await page.click('#loginbtn')
        
        await page.waitForNavigation({waitUntil: 'networkidle2'})
        await page.click('#touchnavbtn')
        await page.click('div[val=todo]')

        res.send(await page.content())
    })
}