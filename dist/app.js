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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var opensea_js_1 = require("opensea-js");
var osClient_1 = __importDefault(require("./osClient"));
var mongodb_1 = require("mongodb");
var utils_1 = require("./utils");
(0, dotenv_1.config)();
var os = (0, osClient_1.default)(new opensea_js_1.OpenSeaAPI({
    apiKey: process.env.OS_KEY,
}));
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var client, data, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                /*   setTimeout(async () => {
                  const client = await new MongoClient(process.env.MONGO_URL!).connect();
              
                  try {
                    const data = await os.updateSales();
                    await updateMongo(client, data);
                  } catch (e) {
                    console.error(e);
                  } finally {
                    await client.close();
                  }
                }, 600_000); */
                console.time("sales");
                return [4 /*yield*/, new mongodb_1.MongoClient(process.env.MONGO_URL).connect()];
            case 1:
                client = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 5, 6, 8]);
                return [4 /*yield*/, os.updateSales()];
            case 3:
                data = _a.sent();
                return [4 /*yield*/, (0, utils_1.updateMongo)(client, data)];
            case 4:
                _a.sent();
                return [3 /*break*/, 8];
            case 5:
                e_1 = _a.sent();
                console.error(e_1);
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, client.close()];
            case 7:
                _a.sent();
                return [7 /*endfinally*/];
            case 8:
                console.log("\n");
                console.timeEnd("sales");
                return [2 /*return*/];
        }
    });
}); })();
/* import express from "express";
import routes from "./routes";

const PORT = process.env.PORT ?? 8080;
const app = express();

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
}); */
