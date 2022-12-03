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
function routes(app, context) {
    return __awaiter(this, void 0, void 0, function* () {
        app.get('*', (req, res) => {
            res.send('404: Forbidden');
        });
        app.post('/student', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const page = yield context.newPage();
            yield page.goto('https://login.jupitered.com/login/');
            yield page.waitForNavigation({ waitUntil: 'networkidle2' });
            console.log(`Post request to /student: ${JSON.stringify(req.body)}`);
            yield page.type('#text_studid1', req.body['id']);
            yield page.type('#text_password1', req.body['password']);
            yield page.type('#text_school1', req.body['school']);
            yield page.type('#text_city1', req.body['city']);
            yield page.$eval('input[name=region1]', (el, state) => el.value = state, req.body['state']);
            yield page.click('#loginbtn');
            yield page.waitForNavigation({ waitUntil: 'networkidle2' });
            yield page.click('#touchnavbtn');
            yield page.click('div[val=todo]');
            res.send(yield page.content());
        }));
    });
}
exports.default = routes;
