import styled from 'styled-components/native';
import { TextInput, TextInputProps } from 'react-native';
import MaskInput from 'react-native-mask-input';


export const Container = styled(MaskInput).attrs<any>(({ theme }) => ({
  placeholderTextColor: theme.COLORS.SUBTEXT
})) <any>`
  width: 100%;
  height: 56px;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 12px;
  font-size: 14px;
  padding: 7px 0;
  padding-left: 20px;
  margin-bottom: 12px;
  font-family: ${({ theme }) => theme.FONTS.TEXT};
  border: 1px solid ${props => props.editable? ({ theme }) => theme.COLORS.BLACK : ({ theme }) => theme.COLORS.BORDER };
  color: ${({ theme }) => theme.COLORS.TEXT };
`;