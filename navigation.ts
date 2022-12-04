import {Page} from "puppeteer"

export async function goLogin(page: Page, body: Record<string, string>) {
    await page.type('#text_studid1', body['id'])
    await page.type('#text_password1', body['password'])
    await page.type('#text_school1', body['school'])
    await page.type('#text_city1', body['city'])
    await page.$eval('input[name=region1]', (el: any, state: string) => el.value = state, body['state'])
    await page.click('#loginbtn')

    console.log(`Successfully logged in to user ${body['id']}`)
}

export async function goTodo(page: Page) {
    await page.waitForNavigation({waitUntil: 'networkidle2'})
    await page.click('#touchnavbtn')
    await page.click('div[val=todo]')
}

export async function goCourse(page: Page, course: string) {
    await fixCourses(page)
    await page.click(`div[classname="${course}"]`)
}

export async function getCourses(page: Page) {
    let courseNames: string[] = []
    await fixCourses(page)

    const els = await page.$$('div[iscourse=true]')
    els.forEach(async el => {
        const value = await el.evaluate(n => n.getAttribute('classname'))
        courseNames.push(String(value))
    })
    
    await page.click('#touchnavbtn')
    return courseNames
}

async function fixCourses(page: Page) {
    await page.click('#touchnavbtn')
    await page.$$eval('.navrow', (els: any) => {
        els.forEach((el: any) => {
            if (el.innerHTML.includes('classnav')) {
                let name = el.innerHTML.replace(/\t+/g, '')
                name = name.substring(22, name.indexOf('</div>', 22))
                el.setAttribute('iscourse', 'true')
                el.setAttribute('classname', name)
            }
        })
    })
}

export async function getElement(page: Page, selector: string) {
    const element = await page.$(selector)
    const handle = await element?.getProperty('innerHTML')
    const value = await handle?.jsonValue()

    return value?.trim()
}