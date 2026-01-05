import styled from 'styled-components';

export const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex-direction: row;
    justify-content: space-between;
    gap: 4rem;
    padding: 4rem 2rem;
  }
`;

export const Title = styled.h1`
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 2rem;
  font-size: 2.5rem;
  
  span {
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.5rem;
    display: block;
    margin-top: 0.5rem;
    font-weight: 400;
  }
`;
