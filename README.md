A simple and cryptographically secure way to generate PIN codes and Strings. Has no dependencies and includes Typescript definitions.

[![GitHub stars](https://img.shields.io/github/stars/ozouai/node-secure-pin.svg)](https://github.com/ozouai/node-secure-pin/stargazers) [![Build Status](https://travis-ci.org/ozouai/node-secure-pin.svg?branch=master&style=flat-square)](https://travis-ci.org/ozouai/node-secure-pin) [![npm](https://img.shields.io/npm/l/secure-pin.svg?style=flat)]() [![Beerpay](https://beerpay.io/ozouai/node-secure-pin/make-wish.svg)](https://beerpay.io/ozouai/node-secure-pin) [![Beerpay](https://beerpay.io/ozouai/node-secure-pin/badge.svg?style=flat)](https://beerpay.io/ozouai/node-secure-pin)

## Installation

From NPM

```
npm install secure-pin
```

Typescript

```typescript
import * as SecurePIN from "secure-pin";
```

Javascript

```javascript
var SecurePIN = require("secure-pin");
```

## Generate PIN

### Signature

```typescript
SecurePIN.generatePin(length : number, callback: (pin: string) => void);
```

* The length can be any number > 0

### Example

```typescript
SecurePIN.generatePin(4, (pin)=> {
    console.log("Pin: " + pin);
})
```

Returns

```text
Pin: 1234
```

## Generate String

In order to generate a string, first you must create a character set. This can either be an array of characters, or the built-in CharSet class

```typescript
	var charSet = new SecurePIN.CharSet();
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

```typescript
	var charSet = new SecurePIN.CharSet();
	charSet.addLowerCaseAlpha().addUpperCaseAlpha().removeChar("aA").randomize();
```

Once you have your CharSet created, pass it along to the string generator and generate a string!

```typescript
	var charSet = ...
	...
	SecurePIN.generateString(15, charSet, function(str) {
		console.log(str);
	});
```

## Entropy

Secure-Pin uses a cryptographically secure method of generating pins, ensuring a high amount of entropy 

![Entropy Graph](https://plot.ly/~zzarzzur/2.png)

Above is a graph of 100,000 randomly generated PINs, with an even distribution across the graph.

<small>The X-Axis represents the PIN number/1000.0f, the Y-Axis represents the amount of times the PIN was generated during the 100,000 cycle.</small>