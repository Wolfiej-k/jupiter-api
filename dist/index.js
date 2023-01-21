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
const scraper_1 = __importDefault(require("./lib/scraper"));
const navigator_1 = __importDefault(require("./lib/navigator"));
class Jupiter {
    constructor(browser) {
        this.browser = browser;
    }
    static launch(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const browser = yield puppeteer_1.default.launch(options);
            return new Jupiter(browser);
        });
    }
    static connect(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const browser = yield puppeteer_1.default.connect(options);
            return new Jupiter(browser);
        });
    }
    request(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const context = yield this.browser.createIncognitoBrowserContext();
            const page = yield context.newPage();
            const navigator = new navigator_1.default(page);
            return new scraper_1.default(request, navigator);
        });
    }
}
Jupiter.launch().then((jupiter) => __awaiter(void 0, void 0, void 0, function* () {
    const request = {
        "id": "249573247",
        "password": "W01fi33141!",
        "school": "Bronx High School of Science",
        "city": "New York City",
        "state": "us_ny"
    };
    const scraper = yield jupiter.request(request);
    const student = yield scraper.data();
    console.log(JSON.stringify(student));
}));
