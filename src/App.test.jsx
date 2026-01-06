import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import * as encryptionUtils from './utils/encryption';

jest.mock('./utils/encryption');

describe('App Principal', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('debería renderizar el título principal', () => {
        render(<App />);
        expect(screen.getByText('Enigma Vault')).toBeInTheDocument();
        expect(screen.getByText('Encriptador de texto')).toBeInTheDocument();
    });

    test('debería encriptar el texto correctamente', () => {
        encryptionUtils.encryptText.mockReturnValue('encrypted_result');
        render(<App />);

        const textInput = screen.getByPlaceholderText('Ingrese el texto aquí...');
        const keyInput = screen.getByPlaceholderText('Ingrese llave secreta (requerido)...');
        const encryptBtn = screen.getByRole('button', { name: /^encriptar$/i });

        fireEvent.change(textInput, { target: { value: 'Secret Message' } });
        fireEvent.change(keyInput, { target: { value: 'key123' } });
        fireEvent.click(encryptBtn);

        expect(encryptionUtils.encryptText).toHaveBeenCalledWith('Secret Message', 'key123');
        expect(screen.getByText('encrypted_result')).toBeInTheDocument();
    });

    test('debería desencriptar el texto correctamente', () => {
        encryptionUtils.decryptText.mockReturnValue('decrypted_result');
        render(<App />);

        const textInput = screen.getByPlaceholderText('Ingrese el texto aquí...');
        const keyInput = screen.getByPlaceholderText('Ingrese llave secreta (requerido)...');
        const decryptBtn = screen.getByRole('button', { name: /^desencriptar$/i });

        fireEvent.change(textInput, { target: { value: 'encrypted_data' } });
        fireEvent.change(keyInput, { target: { value: 'key123' } });
        fireEvent.click(decryptBtn);

        expect(encryptionUtils.decryptText).toHaveBeenCalledWith('encrypted_data', 'key123');
        expect(screen.getByText('decrypted_result')).toBeInTheDocument();
    });

    test('el botón de encriptar debería estar deshabilitado si falta la llave', () => {
        render(<App />);

        const textInput = screen.getByPlaceholderText('Ingrese el texto aquí...');
        const encryptBtn = screen.getByRole('button', { name: /^encriptar$/i });

        fireEvent.change(textInput, { target: { value: 'Secret Message' } });

        expect(encryptBtn).toBeDisabled();
    });

    test('debería mostrar alerta al fallar la desencriptación', () => {
        window.alert = jest.fn();
        encryptionUtils.decryptText.mockReturnValue('');
        render(<App />);

        const textInput = screen.getByPlaceholderText('Ingrese el texto aquí...');
        const keyInput = screen.getByPlaceholderText('Ingrese llave secreta (requerido)...');
        const decryptBtn = screen.getByRole('button', { name: /^desencriptar$/i });

        fireEvent.change(textInput, { target: { value: 'bad_data' } });
        fireEvent.change(keyInput, { target: { value: 'wrong_key' } });
        fireEvent.click(decryptBtn);

        expect(window.alert).toHaveBeenCalledWith('Error al desencriptar. Verifique la llave o el texto.');
    });
});
