import React, { useEffect, useState } from 'react';
import { setDoc, doc } from "firebase/firestore";
import { firestore } from '../../../services/firebase';
import { getAuth } from "firebase/auth";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import { Picker } from '../../Controllers/ImagePicker';

import { Form, Title } from './styles';
import { Input } from '@components/Controllers/Input';
import { Button } from '@components/Controllers/Button';
import { Alert } from 'react-native';
import { saveOnStorage } from '../../../services/firebaseStorage';




export function OrderForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState('')
  const [img, setImg] = useState<any>();
  const [url, setUrl] = useState('');
  const [logo, setLogo] = useState<any>();


  const auth = getAuth();
  const user = auth.currentUser;
  const id = uuidv4()


  useEffect(() => {
    handleGetItems()
  }, [])


  const formValidation = () => {
    if (name !== '' && description !== '' && price !== ''  && logo !== undefined) {
      return true
    }
  }

  async function handleGetItems() {
      if (user) {
        setUserId(user.uid)
      } else {
        console.log('error');
      }
    }
    const isValid = formValidation()

  async function handleSaveItems() {
    setIsLoading(true)

    if (!isValid) {
      alert('Preencher todos os campos e selecionar uma imagem ')
      setIsLoading(false)
    } else {

    try {
      const upDateRef = doc(firestore, userId, id);
      await setDoc(upDateRef, {
        id,
        name,
        description,
        price,
        url: logo,
        
      })
    } catch(error) {console.log(error)
  

    } 
      

      
      Alert.alert(("Salvo com sucesso!"))
      setName('')
      setDescription('')
      setPrice('')
      setUrl('')
      setImg('')
      setIsLoading(false)
      setLogo('')
    }
    await saveOnStorage({ isConfigData: false, userId, logo, id } as any)
  }


  return (
    <Form>
      <Title>Novo Produto/Serviço</Title>
      <Input placeholder="Nome" onChangeText={setName} value={name}  maxLength={50} />
      <Input placeholder="Descrição" onChangeText={setDescription} value={description}  maxLength={70} />
      <Input placeholder="Preço" onChangeText={setPrice} value={price} />
      <Picker editable={true} setLogo={setLogo} logo={logo} url={url} isLoading={false} pickerText={'Add Image'} />
      <Button title="Salvar"  enabled={logo && isValid? true :false} isLoading={isLoading} onPress={handleSaveItems} style={{ marginTop: 10, marginBottom: 10  }} />
    </Form>
  );
}

