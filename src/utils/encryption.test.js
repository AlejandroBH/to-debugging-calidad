import { encryptText, decryptText } from './encryption';

describe('Utilidades de Encriptación', () => {
    const secretKey = 'mySecretKey';
    const originalText = 'Hello World';

    test('debería encriptar y desencriptar correctamente', () => {
        const encrypted = encryptText(originalText, secretKey);
        expect(encrypted).not.toBe(originalText);

        const decrypted = decryptText(encrypted, secretKey);
        expect(decrypted).toBe(originalText);
    });

    test('debería retornar string vacío si no se provee texto', () => {
        expect(encryptText('', secretKey)).toBe('');
        expect(decryptText('', secretKey)).toBe('');
    });
});
