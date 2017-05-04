/**
 * Created by Omar on 5/3/2017.
 */
/// <reference path="typings/index.d.ts" />

import * as chai from "chai";
import * as sp from "./index";
describe("Secure PIN", function() {
    describe("Generate Async, 6 digits", function() {
            it("Should have a length of 6", function(done) {
                sp.generatePin(6, function(pin) {
                chai.assert(pin.length === 6, "Invalid length");
                done();
                })
            });
            it("Should contain only numbers", function(done) {
                sp.generatePin(6, function(pin) {
                var np = pin.replace(/[^0-9]/g, "");
                chai.assert(pin === np, "PIN doesn't contain all numbers");
                done();
                })
            })
    })
    describe("Generate Async, 16 digits", function() {
        it("Should have a length of 16", function(done) {
            sp.generatePin(16, function(pin) {
                chai.assert(pin.length === 16, "Invalid length");
                done();
            })
        });
        it("Should contain only numbers", function(done) {
            sp.generatePin(16, function(pin) {
                var np = pin.replace(/[^0-9]/g, "");
                chai.assert(pin === np, "PIN doesn't contain all numbers");
                done();
            })
        })
    })

    describe("Generate Sync, 6 digits", function() {
        it("Should have a length of 6", function() {
            var pin = sp.generatePinSync(6);
            chai.assert(pin.length === 6, "Invalid length");
        });
        it("Should contain only numbers", function() {
            var pin = sp.generatePinSync(6);
            var np = pin.replace(/[^0-9]/g, "");
            chai.assert(pin === np, "PIN doesn't contain all numbers");
        })
    })
    describe("Generate Sync, 16 digits", function() {
        it("Should have a length of 16", function() {
            var pin = sp.generatePinSync(16);
            chai.assert(pin.length === 16, "Invalid length");
        });
        it("Should contain only numbers", function() {
            var pin = sp.generatePinSync(16)
                var np = pin.replace(/[^0-9]/g, "");
                chai.assert(pin === np, "PIN doesn't contain all numbers");
        })
    })
})