"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rsa_1 = require("./rsa");
// Test values
const p = 61; // First prime number
const q = 53; // Second prime number
const e = 17; // Public exponent
const message = BigInt(65); // Message to encrypt
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
const p2 = 37;
const q2 = 41;
const e2 = 13;
const message2 = BigInt(65);
console.log('\n=== RSA Digital Signature Test ===');
try {
    const signatureResult = (0, rsa_1.RSA_DIGITAL_SIGNATURE)(p2, q2, e2, message2);
    console.log('Message:', Number(message2));
    console.log('Signature:', Number(signatureResult.signature));
    console.log('Verification:', Number(signatureResult.verification));
    console.log('Result:', signatureResult.result ? 'Valid!' : 'Invalid!');
}
catch (error) {
    console.error('Error:', error?.message || 'An error occurred');
}
