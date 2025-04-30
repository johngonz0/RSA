# RSA Implementation in TypeScript

This is a simple implementation of the RSA algorithm in TypeScript by John Gonsalves. The implementation includes key generation, encryption, decryption, and digital signature functionalities.

## Prerequisites

- Node.js (v12.0.0 or higher)
- npm (Node Package Manager)

## Setup

1. Clone or download this repository
2. Install the dependencies:
```bash
npm install
```

## Running the Tests

The repository includes a test file (`test.ts`) that demonstrates both RSA encryption/decryption and digital signatures with example values.

To run the tests:
```bash
npx tsc && node dist/test.js
```

## Modifying the Test Values

You can modify the test values in `test.ts` to try different numbers. Keep in mind:
- `p` and `q` should be prime numbers
- `e` should be coprime with (p-1)(q-1)
- The message should be a positive number less than n (where n = p * q)

## Implementation Details

The implementation includes several key functions:
- `gcd`: Calculates the Greatest Common Divisor using the Euclidean algorithm
- `multInverse`: Calculates the Multiplicative Inverse using the Extended Euclidean algorithm
- `keySchedule`: Generates public and private key pairs
- `rsaEncrypt`: Encrypts a message using the public key
- `rsaDecrypt`: Decrypts a ciphertext using the private key
- `RSA`: Main function that demonstrates the complete encryption/decryption process
- `RSA_DIGITAL_SIGNATURE`: Function that demonstrates digital signature creation and verification

The implementation uses BigInt for handling large number calculations, which is necessary for real-world RSA operations.

## Digital Signatures

The implementation includes a digital signature function that:
1. Creates a signature by encrypting a message with the private key
2. Verifies the signature by decrypting it with the public key
3. Compares the result with the original message to verify