"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var contenuto = fs_1.default.readFileSync("../game/script.js", "utf8");
console.log(contenuto);
