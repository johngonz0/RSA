import { RSA, RSA_DIGITAL_SIGNATURE } from './rsa';

// Test values
const p = 61;  // First prime number
const q = 53;  // Second prime number
const e = 17;  // Public exponent
const message = BigInt(65);  // Message to encrypt/sign

console.log('=== RSA Encryption/Decryption Test ===');
try {
    const result = RSA(p, q, e, message);
    console.log('Original message:', Number(message));
    console.log('Encrypted message (ciphertext):', Number(result.ciphertext));
    console.log('Decrypted message:', Number(result.decrypted));
    console.log('Verification:', message === result.decrypted ? 'Success!' : 'Failed!');
} catch (error: any) {
    console.error('Error:', error?.message || 'An error occurred');
}

console.log('\n=== RSA Digital Signature Test ===');
try {
    const signatureResult = RSA_DIGITAL_SIGNATURE(p, q, e, message);
    console.log('Message:', Number(message));
    console.log('Signature:', Number(signatureResult.signature));
    console.log('Verification:', Number(signatureResult.verification));
    console.log('Result:', signatureResult.result ? 'Valid!' : 'Invalid!');
} catch (error: any) {
    console.error('Error:', error?.message || 'An error occurred');
}
