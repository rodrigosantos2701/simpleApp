import styled from 'styled-components/native';


export const Container = styled.View`
  width: 100%;
  align-items: center;
  flex-direction: row;
`;

export const Box = styled.View`
  width: 100%;
  align-items: flex-start;
  margin-left: 5%;
`;

export const TextTitle = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.FONTS.TITLE};
  color: ${({ theme }) => theme.COLORS.TEXT};
  margin-bottom: 1%;
`;

export const TextDescription = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  color: ${({ theme }) => theme.COLORS.TEXT};
  margin-bottom: 1%;
  max-width: 70%;
  align-items: flex-start;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  align-items: flex-start;
  flex-direction: row;
`;


