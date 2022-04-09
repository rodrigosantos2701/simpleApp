import styled from 'styled-components/native';

export const QRCodeContainer = styled.View`
  width: 100%;
  margin-top: 10%;
  align-items: center;


`;

export const TextInfo = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.FONTS.TITLE};
  color: ${({ theme }) => theme.COLORS.TEXT};
  margin-right: 10px;
  align-self: center;
`;

export const Container = styled.View`
  width: 100%;
  align-items: flex-end;

`;

export const ButtonContainer = styled.View`
  margin-bottom: 15px;
  width: 40%;
  flex-direction: row;
  justify-content: space-between;
`;


