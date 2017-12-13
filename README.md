A simple and cryptographically secure way to generate PIN codes and Strings. Has no dependencies and includes Typescript definitions.

[![GitHub stars](https://img.shields.io/github/stars/ozouai/node-secure-pin.svg)](https://github.com/ozouai/node-secure-pin/stargazers) [![Build Status](https://travis-ci.org/ozouai/node-secure-pin.svg?branch=master&style=flat-square)](https://travis-ci.org/ozouai/node-secure-pin) [![codecov](https://codecov.io/gh/ozouai/node-secure-pin/branch/master/graph/badge.svg)](https://codecov.io/gh/ozouai/node-secure-pin) [![npm](https://img.shields.io/npm/l/secure-pin.svg?style=flat)]() [![Beerpay](https://beerpay.io/ozouai/node-secure-pin/make-wish.svg)](https://beerpay.io/ozouai/node-secure-pin) [![Beerpay](https://beerpay.io/ozouai/node-secure-pin/badge.svg?style=flat)](https://beerpay.io/ozouai/node-secure-pin) [![Homepage](https://img.shields.io/badge/View-Homepage-blue.svg)](https://omarzouai.com/node/7)

## Installation

From NPM

```
npm install secure-pin
```

Typescript

```javascript
import * as securePin from "secure-pin";
```

Javascript

```javascript
var securePin = require("secure-pin");
```

## Generate PIN

### Signature

```javascript
securePin.generatePin(length : number, callback: (pin: string) => void);
```

* The length can be any number > 0

### Example

```javascript
securePin.generatePin(4, (pin)=> {
    console.log("Pin: " + pin);
})
```

Returns

```text
Pin: 1234
```

### Synchronously

You can also generate a pin synchronously with `generatePinSync`

```javascript
var pin = securePin.generatePinSync(4);
```

## Generate Numbers

Methods also exist to securely generate numbers within a given range


### Async

```javascript
securePin.generateInt(0, 100, function(int) {
    console.log(int);
});
```

### Synchronously

```javascript
var int = securePin.generateIntSync(0, 100);
console.log(int);
```

## Generate String

In order to generate a string, first you must create a character set. This can either be an array of characters, or the built-in CharSet class

```javascript
var charSet = new securePin.CharSet();
```

Then, you need to add characters to the set. The class has a couple functions to add basic characters, as well as some extra functions.

* **addLowerCaseAlpha()** Adds the characters `a-z` to the set. Returns the CharSet.
* **addUpperCaseAlpha()** Adds the characters `A-Z` to the set. Returns the CharSet.
* **addNumeric()** Adds the characters `0-9` to the set. Returns the CharSet.
* **addSpecialCharacters()** Adds the characters `!"#$%&'()*+,-./:;<=>?@[\]^_\{|}~`. Returns the CharSet.
* **addCharacter( *char* )** Adds the specified characters to the set. Can be either `a`, `abc`, or `["a", "b", "c"]`. Returns the CharSet.
* **randomize()** Randomizes the characters in the set, providing greater entropy. Returns the CharSet.
* **removeChar( *char* )** Removes the specified characters from the set. Can be either `a`, `abc`, or `["a", "b", "c"]`. Returns the CharSet.

### Example

```javascript
var charSet = new securePin.CharSet();
charSet.addLowerCaseAlpha().addUpperCaseAlpha().removeChar("aA").randomize();
```

Once you have your CharSet created, pass it along to the string generator and generate a string!


```javascript
var charSet = ...
...
securePin.generateString(15, charSet, function(str) {
	console.log(str);
});
```

### Synchronous Example

```javascript
var charSet = ...
...
var str = securePin.generateStringSync(15, charSet);
console.log(str);
```

### Default CharSet

A default character set is also exported, it contains both upper and lower case letters, as well as numeric characters.

```javascript
securePin.generateString(15, securePin.defaultCharset, (str)=>{
    console.log(str);
})
```

## PIN Entropy

Secure-Pin uses a cryptographically secure method of generating pins, ensuring a high amount of entropy 

![Entropy Graph](https://plot.ly/~zzarzzur/2.png)

Above is a graph of 100,000 randomly generated 4 Digit PINs, with an even distribution across the graph.

<small>The X-Axis represents the PIN number/1000.0f, the Y-Axis represents the amount of times the PIN was generated during the 100,000 cycle.</small>

## String Entropy

String generation uses the same cryptographically secure routines as the PIN generation. The result is a secure string generator with a very low collision rate.

Below is a sample of a 5 character alphanumeric string, with both upper and lowercase letters.

```
Collision | Generation | Collided String
----------|------------|----------------
1         | 36368      | V81w4
2         | 64478      | TfYqX
3         | 66830      | kNtBL
4         | 81599      | c5MQH
5         | 86058      | neddv
6         | 88481      | MqHq6
7         | 92785      | wVMep
8         | 94769      | y0uNQ
9         | 94896      | bUERh
10        | 94941      | vKBY7
...
290       | 671944     | JpYhU
291       | 672343     | aLL0D
292       | 674242     | TNnj4
293       | 674632     | Tv9Xp
294       | 674796     | 7dFX6
295       | 675841     | R3weS
296       | 677368     | mwftq
297       | 677385     | O3Lmf
298       | 677507     | 2bOwb
299       | 677818     | 4xQEL
300       | 678343     | KhNZW
```

At the start of the generation, the first collision only occurs after 36,368 strings are generated. As we move later on in the generation we see that the collisions happen more frequently. This is to be expected, as we're only using a 5 character string.

### 10 Character string

Let's increase the string size to 10 characters and see what happens.

```
Collision | Generation | Collided String | Collision Chance
----------|------------|-----------------|-----------------
2796203 Collisions: 0
<--- Last few GCs --->

[25568:0000014404C51BE0]   355188 ms: Mark-sweep 1063.7 (1200.0) -> 1063.6 (1200.0) MB, 2444.7 / 0.0 ms  allocation failure GC in old space requested
```

Oh, we ran out of memory. Apparently we managed to generate 2,796,203 strings without a single collision!