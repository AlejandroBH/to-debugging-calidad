import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faLock } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const Container = styled.div`
  flex: 0 0 400px;
  background: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: 24px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex: 1;
    min-height: 400px;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: ${({ theme }) => theme.colors.textDark};

  h3 {
    margin-top: 1rem;
    color: ${({ theme }) => theme.colors.white};
  }
`;

const OutputText = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.code};
  font-size: 1.1rem;
  word-break: break-all;
  white-space: pre-wrap;
  flex: 1;
  overflow-y: auto;
  margin-bottom: 2rem;
`;

const CopyButton = styled.button`
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  background: transparent;
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 600;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const OutputSection = ({ outputText }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Container>
      {!outputText ? (
        <EmptyState>
          <FontAwesomeIcon icon={faLock} size="4x" style={{ opacity: 0.2 }} />
          <h3>Ningún mensaje encontrado</h3>
          <p>Ingresa el texto que desees encriptar o desencriptar.</p>
        </EmptyState>
      ) : (
        <>
          <OutputText>{outputText}</OutputText>
          <CopyButton onClick={handleCopy}>
            <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
            {copied ? 'Copiado!' : 'Copiar'}
          </CopyButton>
        </>
      )}
    </Container>
  );
};

OutputSection.propTypes = {
  outputText: PropTypes.string.isRequired,
};

export default OutputSection;
