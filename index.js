"use strict";
/**
 * Created by Omar on 5/3/2017.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var MaxUInt = 4294967295;
var crypto = require("crypto");
function generateRandomInt(min, max, cb) {
    crypto.randomBytes(8, function (err, bytes) {
        var uint = Buffer.from(bytes).readUInt32LE(0);
        var rand = map(min, max, uint);
        cb(rand);
    });
}
exports.generateRandomInt = generateRandomInt;
function generateRandomIntSync(min, max) {
    var bytes = crypto.randomBytes(8);
    var uint = Buffer.from(bytes).readUInt32LE(0);
    var rand = map(min, max, uint);
    return rand;
}
exports.generateRandomIntSync = generateRandomIntSync;
function stackGeneratePin(length, min, max, cb) {
    var pin = "";
    generateRandomInt(min, max, function (num) {
        pin += "" + num;
        if (length > 1) {
            stackGeneratePin(length - 1, min, max, function (pin2) {
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
    stackGeneratePin(length, 0, 9, function (pin) {
        cb(pin);
    });
}
exports.generatePin = generatePin;
function generatePinSync(length) {
    var pin = "";
    for (var i = 0; i < length; i++) {
        pin += "" + generateRandomIntSync(0, 9);
    }
    return pin;
}
exports.generatePinSync = generatePinSync;
function map(min, max, int) {
    var range = (max + 1) - min;
    var factor = range / MaxUInt;
    return ((int * factor) + min) >> 0;
}
// pragma mark - String Generators
/**
 * Container for the set of characters used to generate the random string
 */
var CharSet = (function () {
    function CharSet() {
        this.set = [];
    }
    /**
     * Adds lower case alpha characters. E.g (a-z)
     * @returns {CharSet} to chain commands
     */
    CharSet.prototype.addLowerCaseAlpha = function () {
        this.set = this.set.concat("abcdefhijklmnopqrstuvwxyz".split(""));
        return this;
    };
    /**
     * Adds Upper Case alpha characters. E.g (A-Z)
     * @returns {CharSet} to chain commands
     */
    CharSet.prototype.addUpperCaseAlpha = function () {
        this.set = this.set.concat("ABCDEFGHIKJLMNOPQRSTUVWXYZ".split(""));
        return this;
    };
    /**
     * Adds numeric characters. E.g (0-9)
     * @returns {CharSet} to chain commands
     */
    CharSet.prototype.addNumeric = function () {
        for (var i = 0; i < 10; i++) {
            this.set.push("" + i);
        }
        return this;
    };
    /**
     * Adds special characters. "!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"
     * @returns {CharSet} to chain commands
     */
    CharSet.prototype.addSpecialCharacters = function () {
        this.set = this.set.concat("!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~".split(""));
        return this;
    };
    /**
     * Adds custom characters to the set
     * @param chars Can be either an array of characters, a single character, or a string of multiple characters
     * @returns {CharSet} to chain commands
     */
    CharSet.prototype.addCharacter = function (chars) {
        if (typeof chars == "string") {
            if (chars.length == 1) {
                this.set.push(chars);
            }
            else {
                this.set = this.set.concat(chars.split(""));
            }
        }
        if (Array.isArray(chars)) {
            this.set = this.set.concat(chars);
        }
        return this;
    };
    /**
     * Randomizes the character set to provide greater entropy
     * @returns {CharSet} to chain commands
     */
    CharSet.prototype.randomize = function () {
        this.set = shuffle(this.set);
        return this;
    };
    /**
     * Returns a string of the characters used to generate the string
     * @returns {string}
     */
    CharSet.prototype.toString = function () {
        return this.set.join("");
    };
    /**
     * Removes a given character from the set
     * @param char Can be either an array of characters, a single character, or a string of multiple characters
     * @returns {CharSet} to chain commands
     */
    CharSet.prototype.removeChar = function (char) {
        var chars = char;
        if (typeof chars == "string") {
            if (chars.length == 1) {
                chars = [chars];
            }
            else {
                chars = chars.split("");
            }
        }
        for (var _i = 0, chars_1 = chars; _i < chars_1.length; _i++) {
            var c = chars_1[_i];
            if (this.set.indexOf(c) != -1) {
                while (this.set.indexOf(c) != -1) {
                    this.set.splice(this.set.indexOf(c), 1);
                }
            }
        }
        return this;
    };
    /**
     * Returns the character array
     * @returns {Array<string>} the character array
     */
    CharSet.prototype.getCharSet = function () {
        return this.set;
    };
    return CharSet;
}());
exports.CharSet = CharSet;
/**
 * A predefined charset that contains lower and uppercase alpha, and numeric
 * @type {CharSet}
 */
exports.defaultCharset = new CharSet();
exports.defaultCharset.addLowerCaseAlpha().addUpperCaseAlpha().addNumeric().randomize();
/**
 * Generates a cryptographically secure string
 * @param length The desired length of the string
 * @param characters The CharSet or array of characters to use
 * @param cb The callback
 */
function generateString(length, characters, cb) {
    var chars = characters;
    if (chars instanceof CharSet) {
        chars = chars.getCharSet();
    }
    stackGenerateString(length, chars, function (str) {
        cb(str);
    });
}
exports.generateString = generateString;
/**
 * Generates a cryptographically secure string
 * @param length The desired length of the string
 * @param characters The CharSet or array of characters to use
 */
function generateStringSync(length, characters) {
    var chars = characters;
    if (chars instanceof CharSet) {
        chars = chars.getCharSet();
    }
    var pin = "";
    for (var i = 0; i < length; i++) {
        pin += chars[generateRandomIntSync(0, chars.length - 1)];
    }
    return pin;
}
exports.generateStringSync = generateStringSync;
function stackGenerateString(length, characters, cb) {
    var pin = "";
    generateRandomInt(0, characters.length - 1, function (num) {
        pin += "" + characters[num];
        if (length > 1) {
            stackGenerateString(length - 1, characters, function (pin2) {
                pin += pin2;
                cb(pin);
            });
        }
        else {
            cb(pin);
        }
    });
}
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = generateRandomIntSync(0, currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
