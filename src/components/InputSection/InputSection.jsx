import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 300px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundLight};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.2rem;
  padding: 1.5rem;
  resize: none;
  font-family: ${({ theme }) => theme.fonts.code};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 10px rgba(100, 255, 218, 0.1);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const KeyInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;
const KeyInput = styled.input`
    width: 100%;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => theme.colors.backgroundLight};
    color: ${({ theme }) => theme.colors.primary};
    font-family: ${({ theme }) => theme.fonts.code};
    
    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary};
    }
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Button = styled.button`
  flex: 1;
  padding: 1rem;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: transform 0.1s ease;

  &:active {
    transform: scale(0.98);
  }

  ${props => props.$primary ? `
    background: ${props.theme.colors.primary};
    color: ${props.theme.colors.background};
    
    &:hover {
        background: #4cdbb6;
    }
  ` : `
    background: transparent;
    border: 1px solid ${props.theme.colors.primary};
    color: ${props.theme.colors.primary};
    
    &:hover {
        background: rgba(100, 255, 218, 0.1);
    }
  `}
  
  &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
  }
`;

const InputSection = ({ text, setText, secretKey, setKey, onEncrypt, onDecrypt }) => {
  return (
    <Container>
      <StyledTextarea
        placeholder="Ingrese el texto aquí..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <KeyInputWrapper>
        <KeyInput
          type="text"
          placeholder="Ingrese llave secreta (requerido)..."
          value={secretKey}
          onChange={(e) => setKey(e.target.value)}
        />
      </KeyInputWrapper>
      <Controls>
        <Button $primary onClick={onEncrypt} disabled={!text || !secretKey}>
          <FontAwesomeIcon icon={faLock} /> Encriptar
        </Button>
        <Button onClick={onDecrypt} disabled={!text || !secretKey}>
          <FontAwesomeIcon icon={faUnlock} /> Desencriptar
        </Button>
      </Controls>
    </Container>
  );
};

InputSection.propTypes = {
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
  secretKey: PropTypes.string.isRequired,
  setKey: PropTypes.func.isRequired,
  onEncrypt: PropTypes.func.isRequired,
  onDecrypt: PropTypes.func.isRequired,
};

export default InputSection;
