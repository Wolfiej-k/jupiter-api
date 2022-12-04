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
exports.getElement = exports.getCourses = exports.goCourse = exports.goTodo = exports.goLogin = void 0;
function goLogin(page, body) {
    return __awaiter(this, void 0, void 0, function* () {
        yield page.type('#text_studid1', body['id']);
        yield page.type('#text_password1', body['password']);
        yield page.type('#text_school1', body['school']);
        yield page.type('#text_city1', body['city']);
        yield page.$eval('input[name=region1]', (el, state) => el.value = state, body['state']);
        yield page.click('#loginbtn');
        console.log(`Successfully logged in to user ${body['id']}`);
    });
}
exports.goLogin = goLogin;
function goTodo(page) {
    return __awaiter(this, void 0, void 0, function* () {
        yield page.waitForNavigation({ waitUntil: 'networkidle2' });
        yield page.click('#touchnavbtn');
        yield page.click('div[val=todo]');
    });
}
exports.goTodo = goTodo;
function goCourse(page, course) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fixCourses(page);
        yield page.click(`div[classname="${course}"]`);
    });
}
exports.goCourse = goCourse;
function getCourses(page) {
    return __awaiter(this, void 0, void 0, function* () {
        let courseNames = [];
        yield fixCourses(page);
        const els = yield page.$$('div[iscourse=true]');
        els.forEach((el) => __awaiter(this, void 0, void 0, function* () {
            const value = yield el.evaluate(n => n.getAttribute('classname'));
            courseNames.push(String(value));
        }));
        yield page.click('#touchnavbtn');
        return courseNames;
    });
}
exports.getCourses = getCourses;
function fixCourses(page) {
    return __awaiter(this, void 0, void 0, function* () {
        yield page.click('#touchnavbtn');
        yield page.$$eval('.navrow', (els) => {
            els.forEach((el) => {
                if (el.innerHTML.includes('classnav')) {
                    let name = el.innerHTML.replace(/\t+/g, '');
                    name = name.substring(22, name.indexOf('</div>', 22));
                    el.setAttribute('iscourse', 'true');
                    el.setAttribute('classname', name);
                }
            });
        });
    });
}
function getElement(page, selector) {
    return __awaiter(this, void 0, void 0, function* () {
        const element = yield page.$(selector);
        const handle = yield (element === null || element === void 0 ? void 0 : element.getProperty('innerHTML'));
        const value = yield (handle === null || handle === void 0 ? void 0 : handle.jsonValue());
        return value === null || value === void 0 ? void 0 : value.trim();
    });
}
exports.getElement = getElement;
