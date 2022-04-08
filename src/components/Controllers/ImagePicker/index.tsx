import React, { useState, useEffect } from 'react';
import { Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Load } from '../../Animations/Load'

import { TextTitle, Container, Box, ButtonContainer, TextDescription, ContainerLoader } from './styles';


import { Button } from '../Button';
import { RemoveButton } from '../RemoveButton';
import { AddButton } from '../AddButton';

export type PickerProps =  {
  editable: boolean;
  setLogo: any;
  logo: any;
  url: string;
  isLoading: boolean;
  pickerText: string;
}


export function Picker({ editable, setLogo, logo, url, isLoading, pickerText }: PickerProps) {

 
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
        setLogo(result.uri)
      }
    }

  };

  return (
    <Container >
      {isLoading?<ContainerLoader><Load /></ContainerLoader> 
      :
      logo ? <Image source={{ uri: logo }} style={{ width: 100, height: 100 }} />
      : url ? <Image source={{ uri: url }} style={{ width: 100, height: 100 }} /> 
      : <TextTitle></TextTitle>
    }
      <Box>
        <TextTitle >{pickerText}</TextTitle>
        <ButtonContainer>
          <AddButton enabled={editable} onPress={pickImage} />
          {/* <RemoveButton enabled={editable} onPress={() => setLogo(null)} /> */}
        </ButtonContainer>
      </Box>
    </Container>
  );
}
