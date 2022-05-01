import React, { useCallback, useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import { Load } from '../../Animations/Load'
import { getStorage, ref, deleteObject, getDownloadURL, getBlob } from "firebase/storage";

import { RemoveButton } from '../RemoveButton';

import { Container, Box, TextTitle, ButtonContainer, ContainerLoader, TextDescription } from './styles';


export type OrderProps = {
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

function Order({ data, userId, setItemDelete }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasImage, setHasImage] = useState<any>(data.url)


  const Img = useCallback(() => {
    return (
      <Image source={{ uri: hasImage }} style={{ width: 100, height: 100 }} />
    )
  }, [data]);


  const DeleteItem = async (dataId: string) => {
    console.log('=======DELETE=======')
    let item = dataId
    setItemDelete(item)
    const storage = getStorage();
    const storageRef = ref(storage, userId + '/' + item);
    await deleteObject(storageRef)
  }

  return (
    <Container >
      {isLoading ? <ContainerLoader><Load /></ContainerLoader>
        :
        <Img />
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

export default Order