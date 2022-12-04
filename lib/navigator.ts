import {Page, ElementHandle} from "puppeteer"

class Navigator {
    public page: Page
    
    constructor(page: Page) {
        this.page = page
    }

    public async load(): Promise<void> {
        await this.page.goto('https://login.jupitered.com/login/')
        await this.wait()
    }

    public async wait(): Promise<void> {
        await this.page.waitForNavigation()
    }

    public async nav(): Promise<void> {
        await this.page.click('#touchnavbtn')
    }

    public async goLogin(body: Record<string, string>): Promise<void> {
        await this.page.type('#text_studid1', body['id'])
        await this.page.type('#text_password1', body['password'])
        await this.page.type('#text_school1', body['school'])
        await this.page.type('#text_city1', body['city'])
        await this.page.$eval('input[name=region1]', (el: any, state: string) => el.value = state, body['state'])
        await this.page.click('#loginbtn')

        console.log(`Attempting login to user ${body['id']}`)
    }

    public async goCourse(course: string) {
        await this.nav()
        await this.fixCourses()
        await this.page.click(`div[classname="${course}"]`)
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
}

export default Navigator