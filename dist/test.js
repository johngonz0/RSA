"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rsa_1 = require("./rsa");
// Test values
const p = 61; // First prime number
const q = 53; // Second prime number
const e = 17; // Public exponent
const message = BigInt(65); // Message to encrypt/sign
console.log('=== RSA Encryption/Decryption Test ===');
try {
    const result = (0, rsa_1.RSA)(p, q, e, message);
    console.log('Original message:', Number(message));
    console.log('Encrypted message (ciphertext):', Number(result.ciphertext));
    console.log('Decrypted message:', Number(result.decrypted));
    console.log('Verification:', message === result.decrypted ? 'Success!' : 'Failed!');
}
catch (error) {
    console.error('Error:', error?.message || 'An error occurred');
}
console.log('\n=== RSA Digital Signature Test ===');
try {
    const isValid = (0, rsa_1.RSA_DIGITAL_SIGNATURE)(p, q, e, message);
    console.log('Message:', Number(message));
    console.log('Signature:', Number(isValid.signature));
    console.log('Verification:', Number(isValid.verification));
    console.log('Result:', isValid.result);
    console.log('Signature verification:', isValid ? 'Valid!' : 'Invalid!');
}
catch (error) {
    console.error('Error:', error?.message || 'An error occurred');
}
