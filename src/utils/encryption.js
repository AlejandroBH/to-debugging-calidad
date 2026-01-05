import CryptoJS from 'crypto-js';

export const encryptText = (text, secretKey) => {
    if (!text || !secretKey) return '';
    try {
        const ciphertext = CryptoJS.AES.encrypt(text, secretKey).toString();
        return ciphertext;
    } catch (error) {
        console.error("Error de encriptación:", error);
        return '';
    }
};

export const decryptText = (ciphertext, secretKey) => {
    if (!ciphertext || !secretKey) return '';
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
    } catch (error) {
        console.error("Error de desencriptación:", error);
        return '';
    }
};
