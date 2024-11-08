import CryptoJS from 'crypto-js';

const AES_SECRET_KEY = process.env.AES_SECRET_KEY;
const AES_IV = process.env.AES_IV;

export const encryptData = data => {
  const ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    CryptoJS.enc.Utf8.parse(AES_SECRET_KEY),
    {
      iv: CryptoJS.enc.Utf8.parse(AES_IV),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    },
  ).toString();
  return ciphertext;
};

export const decryptData = ciphertext => {
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
};
