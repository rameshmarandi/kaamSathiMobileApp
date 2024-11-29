import CryptoJS from 'crypto-js';
import StorageKeys from '../Config/StorageKeys';

const AES_SECRET_KEY = process.env.AES_SECRET_KEY;
const AES_IV = process.env.AES_IV;

// Flag to toggle encryption and decryption across the app
const isEncrypt = StorageKeys.IS_ENCRYPT === true; // 'true' or 'false' as per the environment setup
console.log('ISEncrypted_values', isEncrypt);
// Encrypt function
export const encryptData = data => {
  if (isEncrypt) {
    const ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      CryptoJS.enc.Utf8.parse(AES_SECRET_KEY),
      {
        iv: CryptoJS.enc.Utf8.parse(AES_IV),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      },
    ).toString();
    return {data: ciphertext}; // Returning encrypted data in an object format
  }
  return {data}; // Return data as is, without encryption
};

// Decrypt function
export const decryptData = ciphertext => {
  if (isEncrypt) {
    const bytes = CryptoJS.AES.decrypt(
      ciphertext,
      CryptoJS.enc.Utf8.parse(AES_SECRET_KEY),
      {
        iv: CryptoJS.enc.Utf8.parse(AES_IV),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      },
    );
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
  return ciphertext; // Return data as is, without decryption
};
