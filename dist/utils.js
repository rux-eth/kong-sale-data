"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.updateMongo = exports.parseTraits = exports.parseSales = void 0;
var constants_1 = require("./constants");
var traits_1 = __importDefault(require("./traits"));
var parseSales = function (sales) {
    var _a;
    var data = {};
    var addSales = function (ids, price, currency) {
        var denom;
        switch (currency) {
            case undefined:
                console.log(ids);
                denom = 1;
                break;
            case "USD Coin":
                denom = Math.pow(10, 6);
                break;
            default:
                denom = Math.pow(10, 18);
                break;
        }
        var formatPrice = parseInt(price, 10) / denom;
        ids.forEach(function (id) {
            if (!(id in data)) {
                data[id] = {
                    current_price: formatPrice,
                    currency: currency !== null && currency !== void 0 ? currency : "unknown",
                };
            }
        });
    };
    for (var i = 0; i < sales.length; i++) {
        var _b = sales[i], takerAssetBundle = _b.takerAssetBundle, makerAssetBundle = _b.makerAssetBundle, currentPrice = _b.currentPrice;
        var currency = (_a = takerAssetBundle.assetContract) === null || _a === void 0 ? void 0 : _a.name;
        addSales(makerAssetBundle.assets.map(function (asset) { return parseInt(asset.tokenId, 10); }), currentPrice, currency);
    }
    return data;
};
exports.parseSales = parseSales;
var parseTraits = function (assets) {
    var traits = {};
    assets.forEach(function (_a) {
        var tokenId = _a.tokenId, t = _a.traits;
        var temp = {};
        t.forEach(function (trait) {
            var temp2 = trait;
            var cat = temp2.trait_type
                .toLowerCase()
                .replace(" ", "_");
            temp[cat] = temp2.value;
        });
        traits[parseInt(tokenId, 10)] = temp;
    });
    return traits;
};
exports.parseTraits = parseTraits;
var updateMongo = function (mongo, data) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedSales, allKongData, i, collection, _a;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                parsedSales = (0, exports.parseSales)(data);
                allKongData = [];
                for (i = 0; i < 10000; i++) {
                    allKongData.push(__assign(__assign({ token_id: i, name: "Kong #".concat(i), bio: null }, ((_b = parsedSales[i]) !== null && _b !== void 0 ? _b : {
                        currency: null,
                        current_price: null,
                    })), traits_1.default[i]));
                }
                collection = mongo.db(constants_1.DATABASE).collection(constants_1.COLLECTION);
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, collection.drop()];
            case 2:
                _c.sent();
                return [3 /*break*/, 4];
            case 3:
                _a = _c.sent();
                return [3 /*break*/, 4];
            case 4: return [4 /*yield*/, collection.insertMany(allKongData)];
            case 5:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.updateMongo = updateMongo;
