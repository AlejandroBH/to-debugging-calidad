import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';
import OutputSection from './OutputSection';

const renderWithTheme = (component) => {
    return render(
        <ThemeProvider theme={theme}>
            {component}
        </ThemeProvider>
    );
};

Object.assign(navigator, {
    clipboard: {
        writeText: jest.fn(),
    },
});

describe('Sección de Salida (OutputSection)', () => {
    test('debería renderizar estado vacío cuando no hay texto de salida', () => {
        renderWithTheme(<OutputSection outputText="" />);
        expect(screen.getByText('Ningún mensaje encontrado')).toBeInTheDocument();
    });

    test('debería renderizar el texto de salida cuando se provee', () => {
        const testOutput = 'Encrypted Message';
        renderWithTheme(<OutputSection outputText={testOutput} />);
        expect(screen.getByText(testOutput)).toBeInTheDocument();
    });

    test('debería copiar el texto al portapapeles', async () => {
        const testOutput = 'Text to copy';
        renderWithTheme(<OutputSection outputText={testOutput} />);

        const copyBtn = screen.getByRole('button', { name: /copiar/i });
        fireEvent.click(copyBtn);

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(testOutput);
        expect(await screen.findByText('Copiado!')).toBeInTheDocument();
    });
});
