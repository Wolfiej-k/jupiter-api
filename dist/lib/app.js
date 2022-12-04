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
const express_1 = __importDefault(require("express"));
const scraper_1 = __importDefault(require("./scraper"));
class App {
    constructor(port, browser) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.browser = browser;
        this.initialize();
        this.routes();
    }
    initialize() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.listen(this.port, () => {
            console.log(`Successfully listening on port ${this.port}`);
        });
    }
    routes() {
        this.app.get('*', (req, res) => {
            console.log(`Get request: ${req.body}`);
            res.send('404: Forbidden');
        });
        this.app.post('/student', (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(`Post request to /student: ${req.body.id}`);
            res.send(JSON.stringify(yield this.scrape(req.body)));
        }));
    }
    scrape(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const context = yield this.browser.createIncognitoBrowserContext();
            const page = yield context.newPage();
            const scraper = new scraper_1.default(body, page);
            return yield scraper.data();
        });
    }
}
exports.default = App;
