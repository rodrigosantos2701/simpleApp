import React, { useCallback, useState } from 'react';
import { Image } from 'react-native';
import { Load } from '../../Animations/Load'
import { getStorage, ref, deleteObject} from "firebase/storage";

import { RemoveButton } from '../RemoveButton';

import { Container, Box, TextTitle, ButtonContainer, ContainerLoader, TextDescription } from './styles';
import { deleteFromStorage } from '../../../services/firebaseStorage';


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
  handleGetItems: () => void;
};

function Order({ data, userId, setItemDelete, handleGetItems }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasImage, setHasImage] = useState<any>(data.url)
 


  const DeleteItem = async (dataId: string) => {
    let item = dataId
    setItemDelete(item)
    const storage = getStorage();
    const storageRef = ref(storage, userId + '/' + item);
    await deleteObject(storageRef)
    deleteFromStorage(item)
    handleGetItems
  }

  return (
    <Container >
      {isLoading ? <ContainerLoader><Load /></ContainerLoader>
        :
        <Image source={{ uri: hasImage }} style={{ width: 100, height: 100 }} />
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

