A simple and cryptographically secure way to generate PIN codes. Has no dependencies and includes Typescript definitions.

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

## Usage

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

## Entropy

Secure-Pin uses a cryptographically secure method of generating pins, ensuring a high amount of entropy 

![Entropy Graph](https://plot.ly/~zzarzzur/2.png)

Above is a graph of 100,000 randomly generated PINs, with an even distribution across the graph.

<small>The X-Axis represents the PIN number/1000.0f, the Y-Axis represents the amount of times the PIN was generated during the 100,000 cycle.</small>