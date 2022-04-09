import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

import { Container } from './styles';

export function AddToClipBoardButton({ enabled, ...rest }: RectButtonProps) {
  const { COLORS } = useTheme();

  return (
    <Container {...rest}>
      <MaterialIcons name="content-copy" size={22} color={enabled? COLORS.BLACK: COLORS.BORDER} />
    </Container>
  )
}