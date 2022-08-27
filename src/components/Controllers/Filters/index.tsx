import React from 'react';
import { useTheme } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';


import { Filter } from '@components/Controllers/Filter';
import { Container, Title, Options, ConfigContainer } from './styles';

type Props = {
  onFilter: (status: string) => void;
  setPrimaryButton: (status: string) => void;

}

export function Filters({ onFilter, setPrimaryButton }: Props) {
  const theme = useTheme();



  //here rules to show principal button like 'novo item', 'salvar'and hide principal button
  
const handleOnPressSettingsIcon = () => {
  onFilter('Configuração');
  setPrimaryButton('newButton')
}

const handleOnPressItensOnMenu = () => {
  onFilter('Itens');
  setPrimaryButton('newItem')
}


const handleOnPressItensLinkAndQrCode = () => {
  onFilter('Link e QrCode');
  setPrimaryButton('hideButton')
}


  return (
    <>
      <ConfigContainer>
        <MaterialIcons  name="settings" size={22}  onPress={handleOnPressSettingsIcon} />
        <Container>
          <Title>Menu</Title>

          <Options>
            <Filter
              title="Link e QrCode"
              backgroundColor={theme.COLORS.QRCODE}
              onPress={handleOnPressItensLinkAndQrCode} />


            <Filter
              title="Itens"
              backgroundColor={theme.COLORS.PRIMARY}
              onPress={handleOnPressItensOnMenu} />
          </Options>
        </Container>
      </ConfigContainer>
    </>
  );
}