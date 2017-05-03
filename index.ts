/**
 * Created by Omar on 5/3/2017.
 */
/// <reference path="typings/index.d.ts" />
var MaxUInt = 4294967295;
import * as crypto from "crypto";


function generateRandomNumber(min: number, max: number, cb: (num: number)=>void) {
    crypto.randomBytes(8, function(err, bytes) {
        var uint = new Buffer(bytes).readUInt32LE(0);
        var rand = map(min, max, uint);
        cb(rand);
    });
}

function generateRandomNumberSync(min: number, max: number) : number {
    var bytes = crypto.randomBytes(8);
        var uint = new Buffer(bytes).readUInt32LE(0);
        var rand = map(min, max, uint);
        return rand;
}

function stackGenerate(length: number, min: number, max: number, cb: (pin: string) => void) {
    var pin = "";
    generateRandomNumber(min, max, (num)=> {
        pin+= ""+num;
        if(length > 1) {
            stackGenerate(length-1, min, max, function(pin2) {
                pin += pin2;
                cb(pin);
            });
        } else {
            cb(pin);
        }
    })
}

export function generatePin(length: number, cb: (pin: string) => void) {
    stackGenerate(length, 0, 9, (pin) => {
        cb(pin);
    })
}

export function generatePinSync(length: number) : string {
    var pin = "";
    for(var i=0; i<length; i++) {
        pin+= ""+ generateRandomNumberSync(0, 9);
    }
    return pin;
}

function map(min, max, int) {
    var range = (max + 1) - min
    var factor = range / MaxUInt;
    return ((int * factor) + min) >> 0;
}