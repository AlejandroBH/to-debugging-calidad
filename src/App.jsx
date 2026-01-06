import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { MainContainer, Title } from './components/Layout/LayoutStyles';
import InputSection from './components/InputSection/InputSection';
import OutputSection from './components/OutputSection/OutputSection';
import { encryptText, decryptText } from './utils/encryption';

function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [secretKey, setSecretKey] = useState('');

  const handleEncrypt = () => {
    const encrypted = encryptText(inputText, secretKey);
    setOutputText(encrypted);
  };

  const handleDecrypt = () => {
    const decrypted = decryptText(inputText, secretKey);

    if (!decrypted) {
      alert('Error al desencriptar. Verifique la llave o el texto.');
      return;
    }
    setOutputText(decrypted);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <MainContainer>
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column' }}>
          <Title>
            Enigma Vault<span>Encriptador de texto</span>
          </Title>
          <InputSection
            text={inputText}
            setText={setInputText}
            secretKey={secretKey}
            setKey={setSecretKey}
            onEncrypt={handleEncrypt}
            onDecrypt={handleDecrypt}
          />
        </div>
        <OutputSection outputText={outputText} />
      </MainContainer>
    </ThemeProvider>
  );
}

export default App;
