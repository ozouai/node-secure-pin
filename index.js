"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Omar on 5/3/2017.
 */
/// <reference path="typings/index.d.ts" />
var MaxUInt = 4294967295;
var crypto = require("crypto");
function generateRandomNumber(min, max, cb) {
    crypto.randomBytes(8, function (err, bytes) {
        var uint = new Buffer(bytes).readUInt32LE(0);
        var rand = map(min, max, uint);
        cb(rand);
    });
}
function generateRandomNumberSync(min, max) {
    var bytes = crypto.randomBytes(8);
    var uint = new Buffer(bytes).readUInt32LE(0);
    var rand = map(min, max, uint);
    return rand;
}
function stackGenerate(length, min, max, cb) {
    var pin = "";
    generateRandomNumber(min, max, function (num) {
        pin += "" + num;
        if (length > 1) {
            stackGenerate(length - 1, min, max, function (pin2) {
                pin += pin2;
                cb(pin);
            });
        }
        else {
            cb(pin);
        }
    });
}
function generatePin(length, cb) {
    stackGenerate(length, 0, 9, function (pin) {
        cb(pin);
    });
}
exports.generatePin = generatePin;
function generatePinSync(length) {
    var pin = "";
    for (var i = 0; i < length; i++) {
        pin += "" + generateRandomNumberSync(0, 9);
    }
    return pin;
}
exports.generatePinSync = generatePinSync;
function map(min, max, int) {
    var range = (max + 1) - min;
    var factor = range / MaxUInt;
    return ((int * factor) + min) >> 0;
}
