"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const navigation_1 = require("./navigation");
const student_1 = require("./student");
const data = {
    "id": "245017082",
    "password": "qwerty",
    "school": "Bronx High School of Science",
    "city": "New York City",
    "state": "us_ny"
};
function routes(app, context) {
    return __awaiter(this, void 0, void 0, function* () {
        app.get('*', (req, res) => {
            res.send('404: Forbidden');
        });
        app.post('/student', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(`Post request to /student: ${JSON.stringify(req.body)}`);
            const page = yield context.newPage();
            const scraped = yield studentData(page, req.body);
            res.send(JSON.stringify(scraped));
        }));
        const page = yield context.newPage();
        const scraped = yield studentData(page, data);
    });
}
exports.default = routes;
function studentData(page, body) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        yield page.goto('https://login.jupitered.com/login/');
        yield page.waitForNavigation(); // {waitUntil: 'networkidle2'}
        yield (0, navigation_1.goLogin)(page, body);
        yield page.waitForNavigation();
        const studentName = (_a = yield (0, navigation_1.getElement)(page, '.toptabnull')) !== null && _a !== void 0 ? _a : 'Couldn\'t get name';
        const courseNames = yield (0, navigation_1.getCourses)(page);
        let courses = [];
        for (const courseName of courseNames) {
            yield (0, navigation_1.goCourse)(page, courseName);
            yield page.waitForNavigation();
        }
        // TODO: get raw html, split by \r\n, iterate line by line
        // get course data and append to courses
        return new student_1.Student(studentName, []);
    });
}
