/**
 * Created by Omar on 5/3/2017.
 */

const MaxUInt = 4294967295;
import * as crypto from "crypto";


export function generateRandomInt(min: number, max: number, cb: (num: number)=>void) {
    crypto.randomBytes(8, function(err, bytes) {
        let uint = Buffer.from(bytes).readUInt32LE(0);
        let rand = map(min, max, uint);
        cb(rand);
    });
}

export function generateRandomIntSync(min: number, max: number) : number {
    let bytes = crypto.randomBytes(8);
        let uint = Buffer.from(bytes).readUInt32LE(0);
        let rand = map(min, max, uint);
        return rand;
}

function stackGeneratePin(length: number, min: number, max: number, cb: (pin: string) => void) {
    let pin = "";
    generateRandomInt(min, max, (num)=> {
        pin+= ""+num;
        if(length > 1) {
            stackGeneratePin(length-1, min, max, function(pin2) {
                pin += pin2;
                cb(pin);
            });
        } else {
            cb(pin);
        }
    })
}

export function generatePin(length: number, cb: (pin: string) => void) {
    stackGeneratePin(length, 0, 9, (pin) => {
        cb(pin);
    })
}

export function generatePinSync(length: number) : string {
    let pin = "";
    for(let i=0; i<length; i++) {
        pin+= ""+ generateRandomIntSync(0, 9);
    }
    return pin;
}

function map(min: number, max: number, int: number) {
    let range = (max + 1) - min
    let factor = range / MaxUInt;
    return ((int * factor) + min) >> 0;
}




// pragma mark - String Generators
/**
 * Container for the set of characters used to generate the random string
 */
export class CharSet {
    protected set: Array<string> = [];

    /**
     * Adds lower case alpha characters. E.g (a-z)
     * @returns {CharSet} to chain commands
     */
    public addLowerCaseAlpha() {
        this.set = this.set.concat("abcdefhijklmnopqrstuvwxyz".split(""));
        return this;
    }

    /**
     * Adds Upper Case alpha characters. E.g (A-Z)
     * @returns {CharSet} to chain commands
     */
    public addUpperCaseAlpha() {
        this.set = this.set.concat("ABCDEFGHIKJLMNOPQRSTUVWXYZ".split(""));
        return this;
    }

    /**
     * Adds numeric characters. E.g (0-9)
     * @returns {CharSet} to chain commands
     */
    public addNumeric() {
        for(let i=0; i<10; i++) {
            this.set.push(""+i);
        }
        return this;
    }

    /**
     * Adds special characters. "!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"
     * @returns {CharSet} to chain commands
     */
    public addSpecialCharacters() {
        this.set = this.set.concat("!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~".split(""));
        return this;
    }

    /**
     * Adds custom characters to the set
     * @param chars Can be either an array of characters, a single character, or a string of multiple characters
     * @returns {CharSet} to chain commands
     */
    public addCharacter(chars: string | string[]) {
        if(typeof chars == "string") {
            if(chars.length == 1) {
                this.set.push(chars);
            } else {
                this.set = this.set.concat(chars.split(""));
            }
        }
        if(Array.isArray(chars)) {
            this.set = this.set.concat(chars);
        }
        return this;
    }

    /**
     * Randomizes the character set to provide greater entropy
     * @returns {CharSet} to chain commands
     */
    public randomize() {
        this.set = shuffle(this.set);
        return this;
    }

    /**
     * Returns a string of the characters used to generate the string
     * @returns {string}
     */
    public toString() {
        return this.set.join("");
    }

    /**
     * Removes a given character from the set
     * @param char Can be either an array of characters, a single character, or a string of multiple characters
     * @returns {CharSet} to chain commands
     */
    public removeChar(char: string | string[]) {

        let chars = char;
        if(typeof chars == "string") {
            if(chars.length == 1) {
                chars = [chars];
            }else {
                chars = chars.split("");
            }
        }
        for(let c of chars) {
            if(this.set.indexOf(c) != -1) {
                while (this.set.indexOf(c) != -1) {
                    this.set.splice(this.set.indexOf(c), 1);
                }
            }
        }
        return this;
    }

    /**
     * Returns the character array
     * @returns {Array<string>} the character array
     */
    public getCharSet() {
        return this.set;
    }
}

/**
 * A predefined charset that contains lower and uppercase alpha, and numeric
 * @type {CharSet}
 */
export const defaultCharset = new CharSet();
defaultCharset.addLowerCaseAlpha().addUpperCaseAlpha().addNumeric().randomize();

/**
 * Generates a cryptographically secure string
 * @param length The desired length of the string
 * @param characters The CharSet or array of characters to use
 * @param cb The callback
 */
export function generateString(length: number, characters: CharSet | Array<string>, cb: (str:string)=>void) {
    let chars = characters;
    if(chars instanceof CharSet) {
        chars = chars.getCharSet();
    }
    stackGenerateString(length, chars, (str) => {
        cb(str);
    })
}
/**
 * Generates a cryptographically secure string
 * @param length The desired length of the string
 * @param characters The CharSet or array of characters to use
 */
export function generateStringSync(length: number, characters: CharSet | Array<string>) {
    let chars = characters;
    if(chars instanceof CharSet) {
        chars = chars.getCharSet();
    }
    let pin = "";
    for(let i=0; i<length; i++) {
        pin+= chars[generateRandomIntSync(0, chars.length-1)];
    }
    return pin;
}

function stackGenerateString(length: number, characters: Array<string>, cb: (str:string) => void) {
    let pin = "";
    generateRandomInt(0, characters.length-1, (num)=> {
        pin+= ""+characters[num];
        if(length > 1) {
            stackGenerateString(length-1, characters, function(pin2) {
                pin += pin2;
                cb(pin);
            });
        } else {
            cb(pin);
        }
    })
}


function shuffle(array: Array<string>) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = generateRandomIntSync(0, currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}