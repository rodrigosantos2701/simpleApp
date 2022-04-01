import styled from 'styled-components/native';

export type OrderStyleProps = {
  status: 'open' | 'closed';
};

export const Container = styled.View`
  width: 100%;
  align-items: center;
  flex-direction: row;
`;

export const Box = styled.View`
  width: 100%;
  align-items: flex-start;
  margin-left: 5%;
  padding: 3%;
`;

export const TextTitle = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.FONTS.TITLE};
  color: ${({ theme }) => theme.COLORS.TEXT};
  margin-top: 2%;
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
  width: 50%;
  align-items: center;
  flex-direction: row;
  padding-top: 1%;
  justify-content: space-between;
`;

export const ContainerLoader = styled.View`
  width: 100px;
  height: 100px;
  align-items: center;
`;
