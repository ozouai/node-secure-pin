"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Omar on 5/3/2017.
 */
var PINGenerator = require("./index");
var readline = require("readline");
var fs = require("fs");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
/*var i = 0;
var created = {};
var collisionCount = 0;
while(true) {
    i++;
    let collide = false;
    var pin = PINGenerator.generatePinSync(4);
    if(created[pin]) { collisionCount++; collide = true; }
    else created[pin] = true;
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(""+i + " Collisions: " + collisionCount);
    if(collide) process.stdout.write("\n");

}*/
var generated = {};
for (var i = 0; i < 500000; i++) {
    var pin = PINGenerator.generatePinSync(8);
    if (!generated[pin])
        generated[pin] = 0;
    generated[pin]++;
}
for (var i = 0; i < (Math.pow(10, 8)); i++) {
    var str = "" + i;
    while (str.length < 4)
        str = "0" + str;
    if (!generated[str])
        generated[str] = 0;
}
var out = [];
for (var g in generated) {
    var p = generated[g];
    out.push({
        PIN: g,
        Count: p
    });
}
out.sort(function (a, b) {
    return parseInt(a.PIN) > parseInt(b.PIN) ? 1.0 : -1.0;
});
var outF = "";
for (var _i = 0, out_1 = out; _i < out_1.length; _i++) {
    var o = out_1[_i];
    outF += "" + (parseInt(o.PIN) / 10000.0) + "," + o.Count + '\n';
}
fs.writeFileSync("temp/out.csv", outF);
process.exit();
