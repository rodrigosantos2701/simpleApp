import styled from 'styled-components/native';

export const Form = styled.View`
  width: 100%;
`;

export const Container = styled.View`
  width: 95%;
  margin-bottom: 50%;
  align-items: flex-end;

`;

export const TextInfo = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.FONTS.TITLE};
  color: ${({ theme }) => theme.COLORS.TEXT};
  margin-right: 10px;
  align-self: center;
`;


export const ButtonContainer = styled.View`
  margin-bottom: 15px;
  width: 25%;
  flex-direction: row;
  justify-content: space-between;
`;


