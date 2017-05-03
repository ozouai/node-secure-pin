A simply and cryptographically secure way to generate PIN codes. Has no dependencies and includes Typescript definitions.

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