import styled from 'styled-components/native';

export const Form = styled.View`
  width: 100%;
`;

export const Container = styled.View`
  width: 95%;
  align-items: flex-end;
  margin-top: 0px

`;

export const TextInfo = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.FONTS.TITLE};
  color: ${({ theme }) => theme.COLORS.TEXT};
  margin-right: 10px;
  align-self: center;
`;


export const ButtonContainer = styled.View`
margin-top: 0px;
  margin-bottom: 4px;
  width: 50%;
  flex-direction: row;
  justify-content: flex-end;
`;


