import { Page, ElementHandle } from "puppeteer"
import JupiterRequest from "./request"

class Navigator {
    private url = 'https://login.jupitered.com/login/'
    private page: Page

    constructor(page: Page) {
        this.page = page
    }

    public async login(request: JupiterRequest): Promise<boolean> {
        await this.page.goto(this.url)
        await this.page.waitForNavigation()
        await this.page.type('#text_studid1', request['id'])
        await this.page.type('#text_password1', request['password'])
        await this.page.type('#text_school1', request['school'])
        await this.page.type('#text_city1', request['city'])
        await this.page.$eval('input[name=region1]', (el: any, state: string) => el.value = state, request['state'])
        await this.page.click('#loginbtn')
        await this.page.waitForNavigation()

        return (await this.getElement('#alert')) == null
    }

    public async toggleNav(): Promise<void> {
        await this.page.click('#touchnavbtn')
    }

    public async goCourse(course: string) {
        await this.toggleNav()
        await this.fixCourses()
        
        const selector = `div[classname="${course}"]`
        const click = await this.page.$eval(selector, el => el.getAttribute('click')) ?? ''
        await this.page.evaluate(click)
        await this.page.waitForNavigation()
    }

    public async fixCourses(): Promise<void> {
        await this.page.$$eval('.navrow', (els: any) => {
            for (const el of els) {
                if (el.innerHTML.includes('classnav')) {
                    let name = el.innerHTML.replace(/\t+/g, '')
                    name = name.substring(22, name.indexOf('</div>', 22))
                    el.setAttribute('iscourse', 'true')
                    el.setAttribute('classname', name)
                }
            }
        })
    }

    public async getElement(selector: string): Promise<ElementHandle | null> {
        return await this.page.$(selector)
    }

    public async getElements(selector: string): Promise<ElementHandle[]> {
        return await this.page.$$(selector)
    }

    public async getHtml(element: ElementHandle | null): Promise<string | undefined> {
        const handle = await element?.getProperty('innerHTML')
        const value = await handle?.jsonValue()
        return value?.trim()
    }
}

export default Navigator