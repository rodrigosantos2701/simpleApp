import React from 'react';
import { useTheme } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';


import { Filter } from '@components/Controllers/Filter';
import { Container, Title, Options, ConfigContainer } from './styles';

type Props = {
  onFilter: (status: string) => void;
}

export function Filters({ onFilter }: Props) {
  const theme = useTheme();

  return (
    <>
      <ConfigContainer>
        <MaterialIcons  name="settings" size={22}  onPress={() => onFilter('Configuração')} />
        <Container>
          <Title>Menu</Title>

          <Options>
            <Filter
              title="Link e QrCode"
              backgroundColor={theme.COLORS.QRCODE}
              onPress={() => onFilter('Link e QrCode')} />


            <Filter
              title="Itens"
              backgroundColor={theme.COLORS.PRIMARY}
              onPress={() => onFilter('Itens')} />
          </Options>
        </Container>
      </ConfigContainer>
    </>
  );
}