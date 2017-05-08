"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Omar on 5/3/2017.
 */
var PINGenerator = require("../index");
var readline = require("readline");
var charSet = new PINGenerator.CharSet();
charSet.addLowerCaseAlpha().addUpperCaseAlpha().addNumeric().randomize().removeChar("");
console.log(charSet.toString());
console.log(PINGenerator.generateStringSync(10, charSet));
function padToLength(str, header) {
    var s = str;
    while (s.length < header.length) {
        s += " ";
    }
    return s;
}
var i = 0;
var created = {};
var collisionCount = 0;
var header = process.stdout.write("Collision | Generation | Collided String | Collision Chance\n");
process.stdout.write("----------|------------|-----------------|----------------- \n");
while (true) {
    i++;
    var collide = false;
    //var pin = PINGenerator.generatePinSync(4);
    var pin = PINGenerator.generateStringSync(5, charSet);
    if (created[pin]) {
        collisionCount++;
        collide = true;
    }
    else
        created[pin] = true;
    readline.cursorTo(process.stdout, 0);
    process.stdout.write("" + i + " Collisions: " + collisionCount);
    if (collide) {
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(padToLength("" + collisionCount, "Collision") + " | " + padToLength("" + i, "Generation") + " | " + padToLength(pin, "Collided String") + " | " + ("" + (collisionCount / i)) + "\n");
    }
}
/*
var generated = {};
for(var i=0; i<500000; i++) {
    var pin = PINGenerator.generatePinSync(8);
    if(!generated[pin]) generated[pin] = 0;
    generated[pin]++;
}

for(var i=0; i<(Math.pow(10, 8)); i++) {
    var str = ""+i;
    while(str.length < 4) str = "0"+str;
    if(!generated[str]) generated[str] = 0;
}

var out = [];
for(var g in generated) {
    var p = generated[g];
    out.push({
        PIN: g,
        Count: p
    });
}
out.sort((a, b)=> {
    return parseInt(a.PIN) > parseInt(b.PIN) ? 1.0 : -1.0
});
var outF = "";
for(var o of out) {
    outF+=""+(parseInt(o.PIN)/10000.0)+","+o.Count+'\n';
}





fs.writeFileSync("temp/out.csv", outF);
process.exit();*/ 
