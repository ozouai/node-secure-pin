"use strict";
/**
 * Created by Omar on 5/3/2017.
 */
/// <reference path="typings/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var sp = require("./index");
var index_1 = require("./index");
describe("PIN Generator", function () {
    describe("Generate Async, 6 digits", function () {
        it("Should have a length of 6", function (done) {
            sp.generatePin(6, function (pin) {
                chai.assert(pin.length === 6, "Invalid length");
                done();
            });
        });
        it("Should contain only numbers", function (done) {
            sp.generatePin(6, function (pin) {
                var np = pin.replace(/[^0-9]/g, "");
                chai.assert(pin === np, "PIN doesn't contain all numbers");
                done();
            });
        });
    });
    describe("Generate Async, 16 digits", function () {
        it("Should have a length of 16", function (done) {
            sp.generatePin(16, function (pin) {
                chai.assert(pin.length === 16, "Invalid length");
                done();
            });
        });
        it("Should contain only numbers", function (done) {
            sp.generatePin(16, function (pin) {
                var np = pin.replace(/[^0-9]/g, "");
                chai.assert(pin === np, "PIN doesn't contain all numbers");
                done();
            });
        });
    });
    describe("Generate Sync, 6 digits", function () {
        it("Should have a length of 6", function () {
            var pin = sp.generatePinSync(6);
            chai.assert(pin.length === 6, "Invalid length");
        });
        it("Should contain only numbers", function () {
            var pin = sp.generatePinSync(6);
            var np = pin.replace(/[^0-9]/g, "");
            chai.assert(pin === np, "PIN doesn't contain all numbers");
        });
    });
    describe("Generate Sync, 16 digits", function () {
        it("Should have a length of 16", function () {
            var pin = sp.generatePinSync(16);
            chai.assert(pin.length === 16, "Invalid length");
        });
        it("Should contain only numbers", function () {
            var pin = sp.generatePinSync(16);
            var np = pin.replace(/[^0-9]/g, "");
            chai.assert(pin === np, "PIN doesn't contain all numbers");
        });
    });
});
describe("String Generator Async", function () {
    describe("Generate lowercase, 10 characters", function () {
        it("Should have a length of 10", function (done) {
            sp.generateString(10, (new index_1.CharSet()).addLowerCaseAlpha(), function (str) {
                chai.assert(str.length === 10, "Invalid Length");
                done();
            });
        });
        it("Should contain only lower case letters", function (done) {
            sp.generateString(10, (new index_1.CharSet()).addLowerCaseAlpha(), function (str) {
                var nstr = str.replace(/[^a-z]/g, "");
                chai.assert(nstr === str, "String doesn't have just lower case letters");
                done();
            });
        });
    });
    describe("Generate uppercase, 10 characters", function () {
        it("Should have a length of 10", function (done) {
            sp.generateString(10, (new index_1.CharSet()).addUpperCaseAlpha(), function (str) {
                chai.assert(str.length === 10, "Invalid Length");
                done();
            });
        });
        it("Should contain only Upper Case letters", function (done) {
            sp.generateString(10, (new index_1.CharSet()).addUpperCaseAlpha(), function (str) {
                var nstr = str.replace(/[^A-Z]/g, "");
                chai.assert(nstr === str, "String doesn't have just upper case letters");
                done();
            });
        });
    });
    describe("Generate mixedCase, 10 characters", function () {
        it("Should have a length of 10", function (done) {
            sp.generateString(10, (new index_1.CharSet()).addUpperCaseAlpha().addLowerCaseAlpha(), function (str) {
                chai.assert(str.length === 10, "Invalid Length");
                done();
            });
        });
        it("Should contain only lower and Upper case letters", function (done) {
            sp.generateString(10, (new index_1.CharSet()).addUpperCaseAlpha().addLowerCaseAlpha(), function (str) {
                var nstr = str.replace(/[^a-z|A-Z]/g, "");
                chai.assert(nstr === str, "String doesn't have just upper case letters");
                done();
            });
        });
    });
    describe("Generate numeric, 10 characters", function () {
        it("Should have a length of 10", function (done) {
            sp.generateString(10, (new index_1.CharSet()).addNumeric(), function (str) {
                chai.assert(str.length === 10, "Invalid Length");
                done();
            });
        });
        it("Should contain only numbers", function (done) {
            sp.generateString(10, (new index_1.CharSet()).addNumeric(), function (str) {
                var nstr = str.replace(/[^0-9]/g, "");
                chai.assert(nstr === str, "String doesn't have just numeric characters");
                done();
            });
        });
    });
});
describe("String Generator Sync", function () {
    describe("Generate lowercase, 10 characters", function () {
        it("Should have a length of 10", function () {
            var str = sp.generateStringSync(10, (new index_1.CharSet()).addLowerCaseAlpha());
            chai.assert(str.length === 10, "Invalid Length");
        });
        it("Should contain only lower case letters", function () {
            var str = sp.generateStringSync(10, (new index_1.CharSet()).addLowerCaseAlpha());
            var nstr = str.replace(/[^a-z]/g, "");
            chai.assert(nstr === str, "String doesn't have just lower case letters");
        });
    });
    describe("Generate uppercase, 10 characters", function () {
        it("Should have a length of 10", function () {
            var str = sp.generateStringSync(10, (new index_1.CharSet()).addUpperCaseAlpha());
            chai.assert(str.length === 10, "Invalid Length");
        });
        it("Should contain only Upper Case letters", function () {
            var str = sp.generateStringSync(10, (new index_1.CharSet()).addUpperCaseAlpha());
            var nstr = str.replace(/[^A-Z]/g, "");
            chai.assert(nstr === str, "String doesn't have just upper case letters");
        });
    });
    describe("Generate mixedCase, 10 characters", function () {
        it("Should have a length of 10", function () {
            var str = sp.generateStringSync(10, (new index_1.CharSet()).addUpperCaseAlpha().addLowerCaseAlpha());
            chai.assert(str.length === 10, "Invalid Length");
        });
        it("Should contain only lower and Upper case letters", function () {
            var str = sp.generateStringSync(10, (new index_1.CharSet()).addUpperCaseAlpha().addLowerCaseAlpha());
            var nstr = str.replace(/[^a-z|A-Z]/g, "");
            chai.assert(nstr === str, "String doesn't have just upper case letters");
        });
    });
    describe("Generate numeric, 10 characters", function () {
        it("Should have a length of 10", function () {
            var str = sp.generateStringSync(10, (new index_1.CharSet()).addNumeric());
            chai.assert(str.length === 10, "Invalid Length");
        });
        it("Should contain only numbers", function () {
            var str = sp.generateStringSync(10, (new index_1.CharSet()).addNumeric());
            var nstr = str.replace(/[^0-9]/g, "");
            chai.assert(nstr === str, "String doesn't have just numeric characters");
        });
    });
});
describe("Number Generator", function () {
    describe("Sync", function () {
        it("Should be within a range of 0-100", function () {
            var i = sp.generateRandomIntSync(0, 100);
            chai.assert(i >= 0, "Less than 0");
            chai.assert(i <= 100, "Greater than 100");
        });
    });
    describe("Async", function () {
        it("Should be within a range of 0-100", function (done) {
            sp.generateRandomInt(0, 100, function (int) {
                chai.assert(int >= 0, "Less than 0");
                chai.assert(int <= 100, "Greater than 100");
                done();
            });
        });
    });
});
describe("String Charset", function () {
    describe("Test Randomization", function () {
        var cs = new sp.CharSet();
        cs.addNumeric().addLowerCaseAlpha().addUpperCaseAlpha();
        var c = [].concat(cs.getCharSet().slice(0));
        cs.randomize();
        it("Should be the same length", function () {
            chai.assert(c.length == cs.getCharSet().length, "Different Length");
        });
        it("Shouldn't be the same contents", function () {
            chai.expect(cs.getCharSet()).to.not.eql(c);
        });
    });
    describe("Test Character Delete", function () {
        it("Should delete a single character", function () {
            var cs = new sp.CharSet();
            cs.addNumeric().addLowerCaseAlpha().addUpperCaseAlpha().addSpecialCharacters();
            cs.removeChar("a");
            chai.expect(cs.getCharSet()).to.not.contain("a", "a wasn't deleted");
        });
        it("Should delete a string of characters", function () {
            var cs = new sp.CharSet();
            cs.addNumeric().addLowerCaseAlpha().addUpperCaseAlpha().addSpecialCharacters();
            cs.removeChar("abc");
            chai.expect(cs.getCharSet()).to.not.contain("a", "a wasn't deleted");
            chai.expect(cs.getCharSet()).to.not.contain("b", "b wasn't deleted");
            chai.expect(cs.getCharSet()).to.not.contain("c", "c wasn't deleted");
        });
        it("Should delete an array of characters", function () {
            var cs = new sp.CharSet();
            cs.addNumeric().addLowerCaseAlpha().addUpperCaseAlpha().addSpecialCharacters();
            cs.removeChar(["a", "b", "c"]);
            chai.expect(cs.getCharSet()).to.not.contain("a", "a wasn't deleted");
            chai.expect(cs.getCharSet()).to.not.contain("b", "b wasn't deleted");
            chai.expect(cs.getCharSet()).to.not.contain("c", "c wasn't deleted");
        });
    });
});
