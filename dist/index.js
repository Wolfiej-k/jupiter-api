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
const puppeteer_1 = __importDefault(require("puppeteer"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const options = (process.env.NODE_ENV === 'dev') ? {} : {
    headless: false,
    slowMo: 10,
    args: ['--start-maximized']
};
puppeteer_1.default.launch(options).then((browser) => __awaiter(void 0, void 0, void 0, function* () {
    const context = yield browser.createIncognitoBrowserContext();
    (0, routes_1.default)(app, context);
    app.listen(port, () => {
        console.log(`Successfully listening on port ${port}`);
    });
}));
