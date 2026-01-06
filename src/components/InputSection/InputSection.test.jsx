import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';
import InputSection from './InputSection';

const renderWithTheme = (component) => {
    return render(
        <ThemeProvider theme={theme}>
            {component}
        </ThemeProvider>
    );
};

describe('Sección de Entrada (InputSection)', () => {
    const mockSetText = jest.fn();
    const mockSetKey = jest.fn();
    const mockOnEncrypt = jest.fn();
    const mockOnDecrypt = jest.fn();

    const defaultProps = {
        text: '',
        setText: mockSetText,
        secretKey: '',
        setKey: mockSetKey,
        onEncrypt: mockOnEncrypt,
        onDecrypt: mockOnDecrypt
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('debería renderizar inputs y botones correctamente', () => {
        renderWithTheme(<InputSection {...defaultProps} />);

        expect(screen.getByPlaceholderText('Ingrese el texto aquí...')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Ingrese llave secreta (requerido)...')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /^encriptar$/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /^desencriptar$/i })).toBeInTheDocument();
    });

    test('debería manejar cambios en el input de texto', () => {
        renderWithTheme(<InputSection {...defaultProps} />);

        const textInput = screen.getByPlaceholderText('Ingrese el texto aquí...');
        fireEvent.change(textInput, { target: { value: 'test text' } });

        expect(mockSetText).toHaveBeenCalledWith('test text');
    });

    test('debería manejar cambios en el input de la llave', () => {
        renderWithTheme(<InputSection {...defaultProps} />);

        const keyInput = screen.getByPlaceholderText('Ingrese llave secreta (requerido)...');
        fireEvent.change(keyInput, { target: { value: 'secret' } });

        expect(mockSetKey).toHaveBeenCalledWith('secret');
    });

    test('debería llamar a la función encriptar al hacer click en el botón', () => {
        renderWithTheme(<InputSection {...defaultProps} text="some text" secretKey="key" />);

        const encryptBtn = screen.getByRole('button', { name: /^encriptar$/i });
        fireEvent.click(encryptBtn);

        expect(mockOnEncrypt).toHaveBeenCalled();
    });

    test('los botones deberían estar deshabilitados cuando los inputs están vacíos', () => {
        renderWithTheme(<InputSection {...defaultProps} />);

        const encryptBtn = screen.getByRole('button', { name: /^encriptar$/i });
        expect(encryptBtn).toBeDisabled();
    });
});
