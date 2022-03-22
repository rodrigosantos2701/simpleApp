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
          onPress={() => onFilter('open')}
        />

        <Filter
          title="Cadastro"
          backgroundColor={theme.COLORS.PRIMARY}
          onPress={() => onFilter('closed')}
        />
      </Options>
    </Container>
  );
}