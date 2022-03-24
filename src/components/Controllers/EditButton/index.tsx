import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

import { Container } from './styles';

export function EditButton({ ...rest }: RectButtonProps) {
  const { COLORS } = useTheme();

  return (
    <Container {...rest}>
      <MaterialIcons name="edit" size={22} color={COLORS.BLACK} />
    </Container>
  )
}