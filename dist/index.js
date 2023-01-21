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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const scraper_1 = __importDefault(require("./scraper/scraper"));
const navigator_1 = __importDefault(require("./scraper/navigator"));
/**
 * Entry-point for the third-party Jupiter API.
 * Retrieves student grades, courses, and assignments.
 * See {@link https://jupitered.com/} for more information about the JupiterEd platform.
 * Based on the Puppeteer web-crawling library, found at {@link https://github.com/puppeteer/puppeteer}.

 * @version 0.5.0
 */
class Jupiter {
    /**
     * @remarks
     * Recommended to call the `launch()` or `connect()` factory methods
     * rather than constructing a `Jupiter` instance directly.
     *
     * @param {Browser} browser - Puppeteer `Browser` instance
     */
    constructor(browser) {
        this.browser = browser;
    }
    /**
     * Launches a Chromium instance and constructs a `Jupiter` object.
     *
     * @param {PuppeteerLaunchOptions} options - Options to configure Puppeteer launching behavior
     * @returns {Promise<Jupiter>} Promise resolving to `Jupiter` object
     *
     * @example
     * ```ts
     * Jupiter.launch().then(async (jupiter) => {
     *      // Perform requests
     * })
     * ```
     */
    static launch(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const browser = yield puppeteer_1.default.launch(options);
            return new Jupiter(browser);
        });
    }
    /**
     * Connects to an existing Chromium instance and constructs a `Jupiter` object.
     *
     * @param options - Options to configure Puppeteer browser behavior
     * @returns {Promise<Jupiter>} Promise resolving to `Jupiter` object
     *
     * @example
     * ```ts
     * Jupiter.connect({...options}).then(async (jupiter) => {
     *      // Perform requests
     * })
     * ```
     */
    static connect(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const browser = yield puppeteer_1.default.connect(options);
            return new Jupiter(browser);
        });
    }
    /**
     * Creates a new Jupiter request and returns a `Scraper` object.
     *
     * @param request - Login details for {@link https://login.jupitered.com/login/}
     * @returns {Promise<Scraper>} Promise resolving to `Scraper` object
     *
     * @example
     * ```ts
     * const scraper = await jupiter.request({
     *      id: '#########',
     *      password: '#########',
     *      school: 'Bronx High School of Science',
     *      city: 'New York City',
     *      state: 'us_ny'
     * })
     * ```
     */
    request(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const context = yield this.browser.createIncognitoBrowserContext();
            const page = yield context.newPage();
            const navigator = new navigator_1.default(page);
            return new scraper_1.default(request, navigator);
        });
    }
}
