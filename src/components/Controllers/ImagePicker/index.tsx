import React, { useState, useEffect } from 'react';
import { Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AddButton } from '../AddButton';

import { TextTitle, Container, Box, ButtonContainer, TextDescription } from './styles';


import { Button } from '../Button';
import { RemoveButton } from '../RemoveButton';


const mock = {
  title: 'Add Logo ',
  // price: '1.439,90',
  description: 'Descricão pequena do produto.'
}

export default function Picker() {
  const [image, setImage] = useState<any | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <Container >
      {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
      <Box>
        <TextTitle>{mock.title}</TextTitle>
        <ButtonContainer>
        <AddButton onPress={pickImage} />
        <RemoveButton onPress={() => setImage(null)} />
        </ButtonContainer>
      </Box>
    </Container>
  );
}
