/**
 * Created by Omar on 5/3/2017.
 */
import * as PINGenerator from "./index";

PINGenerator.generatePin(4, function(pin) {
    console.log("ASYNC:" + pin);
})
console.log("SYNC:" + PINGenerator.generatePinSync(4));