import {Express, Request, Response} from "express"
import {BrowserContext, Page} from "puppeteer"
import {goLogin, goTodo, getElement, goCourse, getCourses} from "./navigation"
import {Student, Course, Category, Assignment} from "./student"

const data = {
    "id": "245017082",
    "password": "qwerty",
    "school": "Bronx High School of Science",
    "city": "New York City",
    "state": "us_ny"
}

export default async function routes(app: Express, context: BrowserContext) {
    app.get('*', (req: Request, res: Response) => {
        res.send('404: Forbidden')
    })

    app.post('/student', async (req: Request, res: Response) => {
        console.log(`Post request to /student: ${JSON.stringify(req.body)}`)
        const page = await context.newPage()
        const scraped = await studentData(page, req.body)

        res.send(JSON.stringify(scraped))
    })

    const page = await context.newPage()
    const scraped = await studentData(page, data)
}

async function studentData(page: Page, body: Record<string, string>): Promise<Student> {
    await page.goto('https://login.jupitered.com/login/')
    await page.waitForNavigation() // {waitUntil: 'networkidle2'}
    await goLogin(page, body)
    await page.waitForNavigation()

    const studentName = await getElement(page, '.toptabnull') ?? 'Couldn\'t get name'
    const courseNames = await getCourses(page)

    let courses: Course[] = []
    for (const courseName of courseNames) {
        await goCourse(page, courseName)
        await page.waitForNavigation()
    }

    // TODO: get raw html, split by \r\n, iterate line by line
    // get course data and append to courses
    
    return new Student(studentName, [])
}