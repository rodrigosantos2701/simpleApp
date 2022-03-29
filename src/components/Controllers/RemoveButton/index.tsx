import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

import { Container } from './styles';

export function RemoveButton({ enabled, ...rest }: RectButtonProps) {
  const { COLORS } = useTheme();

  return (
    <Container {...rest}>
      <MaterialIcons name="remove-circle-outline" size={22} color={enabled? COLORS.BLACK: COLORS.BORDER} />
    </Container>
  )
}