import React, {useEffect, useState} from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import { Image, View } from 'react-native';
import { Load } from '../../Animations/Load'
import { getAuth } from "firebase/auth";
import { getStorage, ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";



import { RemoveButton } from '../RemoveButton';

import { Container, Box, TextTitle, ButtonContainer, ContainerLoader, TextDescription } from './styles';


export type OrderProps =  {
  id: string;
  name: string;
  description: string;
  price: string;
  url: string;
}

type Props = {
  data: OrderProps;
  userId: any;
  setItemDelete: any;
};

const auth = getAuth();
const user = auth.currentUser;

export function Order({ data, userId, setItemDelete }: Props) {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);


  const DeleteItem = async (dataId: string) => {

    let item = dataId
    setItemDelete(item)
    const storage = getStorage();
    const storageRef = ref(storage, userId +'/'+ item);
    await deleteObject(storageRef)

  }
  
  return (
      <Container >
        {isLoading?<ContainerLoader><Load /></ContainerLoader> 
        :
        <Image source={{ uri: data.url }} style={{ width: 100, height: 100 }} /> 
      }
        <Box>
          <TextTitle >{data.name} </TextTitle>
          <TextDescription >{data.description}</TextDescription>
          <ButtonContainer>
            <TextTitle> R$ {data.price}</TextTitle>
            <RemoveButton enabled={true} onPress={() => DeleteItem(data.id)} />
          </ButtonContainer>
        </Box>
      </Container>
    );
    
}