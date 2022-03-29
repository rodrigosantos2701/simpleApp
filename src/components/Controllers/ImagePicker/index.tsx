import React, { useState, useEffect } from 'react';
import { Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AddButton } from '../AddButton';

import { TextTitle, Container, Box, ButtonContainer, TextDescription } from './styles';


import { Button } from '../Button';
import { RemoveButton } from '../RemoveButton';


const mock = {
  title: 'Add Logo ',
  description: 'Descricão pequena do produto.'
}

export default function Picker({editable, setLogo, logo, setResultImg}: any) {
  const [image, setImage] = useState<any | null>(null);
  

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    if (editable === true) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.cancelled) {
        console.log('result ==> ',result);

        setImage(result.uri);
        setLogo(result.uri)
      }
    }
    
  };

  return (
    <Container >
      {logo ? <Image source={{ uri: logo }} style={{ width: 100, height: 100 }} />: <TextTitle></TextTitle>}
      <Box>
        <TextTitle >{mock.title}</TextTitle>
        <ButtonContainer>
          <AddButton enabled={editable} onPress={pickImage} />
          <RemoveButton enabled={editable} onPress={() => setImage(null)} />
        </ButtonContainer>
      </Box>
    </Container>
  );
}
