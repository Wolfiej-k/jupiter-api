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
/**
 * Entry-point for the third-party Jupiter API.
 *
 * @remarks
 * Initializes Chromium web-crawler, creates requests, and generates `Scraper` objects.
 */
class Jupiter {
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
     * Jupiter.launch({...options}).then(async (jupiter) => {
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
     * jupiter.request({
     *      id: '#########',
     *      password: '#########',
     *      school: 'Bronx High School of Science',
     *      city: 'New York City',
     *      state: 'us_ny'
     * }).then(async (scraper) => {
     *      // Retrieve and parse data
     *      // See Scraper for more details
     * })
     * ```
     */
    request(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const context = yield this.browser.createIncognitoBrowserContext();
            const page = yield context.newPage();
            return new scraper_1.default(request, page);
        });
    }
}
exports.default = Jupiter;
Jupiter.launch().then((jupiter) => __awaiter(void 0, void 0, void 0, function* () {
    const request = {
        "id": "249573247",
        "password": "W01fi33141!",
        "school": "Bronx High School of Science",
        "city": "New York City",
        "state": "us_ny"
    };
    const scraper = yield jupiter.request(request);
    const result = yield scraper.data();
    console.log(result.toString());
}));
