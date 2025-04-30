"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RSA_DIGITAL_SIGNATURE = exports.RSA = void 0;
/**
 * RSA encryption and decryption implementation
 * @param p - First prime number
 * @param q - Second prime number
 * @param e - Public exponent
 * @param message - Message to encrypt
 * @returns Object containing ciphertext and decrypted message
 */
const RSA = (p, q, e, message) => {
    const keys = keySchedule(p, q, e);
    const ciphertext = rsaEncrypt(keys.publicKey, message);
    const decrypted = rsaDecrypt(keys.privateKey, ciphertext);
    return {
        publicKey: keys.publicKey,
        privateKey: keys.privateKey,
        ciphertext: BigInt(ciphertext),
        decrypted: BigInt(decrypted)
    };
};
exports.RSA = RSA;
/**
 * RSA digital signature function
 * @param p - First prime number
 * @param q - Second prime number
 * @param e - Public exponent
 * @param message - Message to encrypt
 * @returns Object containing signature, verification, and result
 */
const RSA_DIGITAL_SIGNATURE = (p, q, e, message) => {
    const keys = keySchedule(p, q, e);
    const signature = rsaDecrypt(keys.privateKey, message);
    const result = rsaEncrypt(keys.publicKey, signature);
    return {
        signature: BigInt(signature),
        verification: BigInt(result),
        result: result === message
    };
};
exports.RSA_DIGITAL_SIGNATURE = RSA_DIGITAL_SIGNATURE;
/**
 * Key schedule function to generate public and private keys
 * @param p - First prime number
 * @param q - Second prime number
 * @param e - Public exponent
 * @returns Object containing public and private keys
 */
function keySchedule(p, q, e) {
    const pBig = BigInt(p);
    const qBig = BigInt(q);
    const eBig = BigInt(e);
    const n = pBig * qBig;
    const phiN = (pBig - 1n) * (qBig - 1n);
    if (eBig < 2n || eBig >= phiN || gcd(eBig, phiN) !== 1n) {
        throw new Error("Invalid e choice, please try again.");
    }
    const d = multInverse(eBig, phiN);
    return {
        publicKey: {
            e: eBig,
            n
        },
        privateKey: {
            d,
            n
        },
    };
}
/**
 * RSA encryption function
 * @param publicKey - Public key
 * @param message - Message to encrypt
 * @returns Encrypted message as bigint
 */
function rsaEncrypt(publicKey, message) {
    return message ** publicKey.e % publicKey.n;
}
/**
 * RSA decryption function
 * @param privateKey - Private key
 * @param ciphertext - Ciphertext
 * @returns Decrypted message as bigint
 */
function rsaDecrypt(privateKey, ciphertext) {
    const cBig = BigInt(ciphertext);
    return cBig ** privateKey.d % privateKey.n;
}
/**
 * Calculate Greatest Common Divisor using Euclidean algorithm
 * @param a - First number
 * @param b - Second number
 * @returns Greatest Common Divisor as bigint
 */
function gcd(a, b) {
    while (b !== 0n) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}
/**
 * Calculate Multiplicative Inverse using Extended Euclidean algorithm
 * @param a - First number
 * @param m - Second number
 * @returns Multiplicative Inverse as bigint
 */
function multInverse(a, m) {
    let [oldR, r] = [a, m];
    let [oldS, s] = [1n, 0n];
    let [oldT, t] = [0n, 1n];
    while (r !== 0n) {
        const quotient = oldR / r;
        [oldR, r] = [r, oldR - quotient * r];
        [oldS, s] = [s, oldS - quotient * s];
        [oldT, t] = [t, oldT - quotient * t];
    }
    if (oldR !== 1n) {
        throw new Error("Multiplicative inverse does not exist");
    }
    // Ensure the result is positive
    return ((oldS % m) + m) % m;
}
