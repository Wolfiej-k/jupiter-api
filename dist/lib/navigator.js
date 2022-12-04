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
class Navigator {
    constructor(page) {
        this.page = page;
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.goto('https://login.jupitered.com/login/');
            yield this.wait();
        });
    }
    wait() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.waitForNavigation();
        });
    }
    nav() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.click('#touchnavbtn');
        });
    }
    goLogin(body) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.type('#text_studid1', body['id']);
            yield this.page.type('#text_password1', body['password']);
            yield this.page.type('#text_school1', body['school']);
            yield this.page.type('#text_city1', body['city']);
            yield this.page.$eval('input[name=region1]', (el, state) => el.value = state, body['state']);
            yield this.page.click('#loginbtn');
            console.log(`Attempting login to user ${body['id']}`);
        });
    }
    goCourse(course) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.nav();
            yield this.fixCourses();
            yield this.page.click(`div[classname="${course}"]`);
        });
    }
    fixCourses() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.$$eval('.navrow', (els) => {
                for (const el of els) {
                    if (el.innerHTML.includes('classnav')) {
                        let name = el.innerHTML.replace(/\t+/g, '');
                        name = name.substring(22, name.indexOf('</div>', 22));
                        el.setAttribute('iscourse', 'true');
                        el.setAttribute('classname', name);
                    }
                }
            });
        });
    }
    getElement(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.page.$(selector);
        });
    }
    getElements(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.page.$$(selector);
        });
    }
}
exports.default = Navigator;
