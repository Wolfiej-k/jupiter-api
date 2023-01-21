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
/**
 * Crawls the student front-end of Jupiter.
 */
class Navigator {
    /**
     * @param {Page} page - Puppeteer `Page` to navigate
     */
    constructor(page) {
        this.url = 'https://login.jupitered.com/login/';
        this.page = page;
    }
    /**
     * Logs in to the Jupiter web client.
     *
     * @param {JupiterRequest} request - Login details for {@link https://login.jupitered.com/login/}
     * @returns {Promise<boolean>} Promise resolving to `true` if successful
     *
     * @example
     * ```ts
     * const result = await navigator.login({
     *      id: '#########',
     *      password: '#########',
     *      school: 'Bronx High School of Science',
     *      city: 'New York City',
     *      state: 'us_ny'
     * })
     *
     * console.log(`Login status: {result}`)
     * ```
     */
    login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.goto(this.url);
            yield this.page.waitForNavigation();
            yield this.page.type('#text_studid1', request['id']);
            yield this.page.type('#text_password1', request['password']);
            yield this.page.type('#text_school1', request['school']);
            yield this.page.type('#text_city1', request['city']);
            yield this.page.$eval('input[name=region1]', (el, state) => el.value = state, request['state']);
            yield this.page.click('#loginbtn');
            yield this.page.waitForNavigation();
            return (yield this.getElement('#alert')) == null;
        });
    }
    /**
     * Opens or closes the left navbar.
     */
    toggleNav() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.click('#touchnavbtn');
        });
    }
    /**
     * Navigates to course information page.
     *
     * @remarks
     * `goCourse()` searches for `div` elements with the course name as an attribute. Since Jupiter provides no indexable information by default, it is necessary to first call `fixCourses()` to set the attributes and add this functionality.
     *
     * @param {string} course - Exact name of the course to visit
     */
    goCourse(course) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield this.toggleNav();
            yield this.fixCourses();
            const selector = `div[classname="${course}"]`;
            const click = (_a = yield this.page.$eval(selector, el => el.getAttribute('click'))) !== null && _a !== void 0 ? _a : '';
            yield this.page.evaluate(click);
            yield this.page.waitForNavigation();
        });
    }
    /**
     * Sets the `classname` attribute to the course name for each course listed in the navbar.
     *
     * @see {@link goCourse} for more information.
     */
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
    /**
     * Retrieve the first HTML element on the page matching a query.
     *
     * @param {string} selector - Puppeteer search query
     * @returns {Promise<ElementHandle | null>} Promise resolving to an `ElementHandle` or null if the target is not present
     */
    getElement(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.page.$(selector);
        });
    }
    /**
     * Retrieve all HTML elements on the page matching a query.
     *
     * @param {string} selector - Puppeteer search query
     * @returns {Promise<ElementHandle[]>} Promise resolving to an `ElementHandle` array
     */
    getElements(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.page.$$(selector);
        });
    }
    /**
     * Retrieve raw HTML from an HTML `ElementHandle`.
     *
     * @param {ElementHandle | null} element - Handle to HTML element, null-safe
     * @returns {Promise<string | undefined>} Promise resolving to raw HTML string or `undefined` if not present
     */
    getHtml(element) {
        return __awaiter(this, void 0, void 0, function* () {
            const handle = yield (element === null || element === void 0 ? void 0 : element.getProperty('innerHTML'));
            const value = yield (handle === null || handle === void 0 ? void 0 : handle.jsonValue());
            return value === null || value === void 0 ? void 0 : value.trim();
        });
    }
}
exports.default = Navigator;
