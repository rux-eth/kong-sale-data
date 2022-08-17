"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
var app = (0, express_1.default)();
var PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
app.use("/", routes_1.default);
app.listen(PORT, function () {
    console.log("Listening at http://localhost:3000");
});
