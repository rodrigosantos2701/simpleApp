import React from 'react';
import { useTheme } from 'styled-components/native';

import { Filter } from '@components/Controllers/Filter';
import { Container, Title, Options } from './styles';

type Props = {
  onFilter: (status: string) => void;
}

export function Filters({ onFilter }: Props) {
  const theme = useTheme();

  return (
    <Container>
      <Title>Menu</Title>

      <Options>
        <Filter
          title="Configuração"
          backgroundColor={theme.COLORS.SECONDARY}
          onPress={() => onFilter('Configuração')}
        />
        <Filter
          title="Link e QrCode"
          backgroundColor={theme.COLORS.QRCODE}
          onPress={() => onFilter('Link e QrCode')}
        />


        <Filter
          title="Itens"
          backgroundColor={theme.COLORS.PRIMARY}
          onPress={() => onFilter('Itens')}
        />
      </Options>
    </Container>
  );
}