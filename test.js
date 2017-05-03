"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Omar on 5/3/2017.
 */
var PINGenerator = require("./index");
PINGenerator.generatePin(4, function (pin) {
    console.log("ASYNC:" + pin);
});
console.log("SYNC:" + PINGenerator.generatePinSync(4));
