import React, { useEffect, useState } from 'react';
import { collection, addDoc, setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from '../../../services/firebase';
import { getAuth } from "firebase/auth";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import { Picker, PickerProps } from '../../Controllers/ImagePicker';

import { Form, Title } from './styles';
import { Input } from '@components/Controllers/Input';
import { Button } from '@components/Controllers/Button';
import { TextArea } from '@components/Controllers/TextArea';
import { Alert, View } from 'react-native';
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

  async function handleSaveItems() {
    saveOnStorage(userId as any)
    setIsLoading(true)
    let isValid = formValidation()

    if (!isValid) {
      alert('Preencher todos os campos e selecionar uma imagem ')
      setIsLoading(false)

    } else {
      const upDateRef = doc(firestore, userId, id);

      await setDoc(upDateRef, {
        id,
        name,
        description,
        price,
        url:logo,

      })
      Alert.alert(("Salvo com sucesso!"))
      setName('')
      setDescription('')
      setPrice('')
      setUrl('')
      setImg('')
      setIsLoading(false)
      setLogo('')
    }
  }


  return (
    <Form>
      <Title>Novo Produto/Serviço</Title>
      <Input placeholder="Nome" onChangeText={setName} value={name}  maxLength={50} />
      <Input placeholder="Descrição" onChangeText={setDescription} value={description}  maxLength={70} />
      <Input placeholder="Preço" onChangeText={setPrice} value={price} />
      <Picker editable={true} setLogo={setLogo} logo={logo} url={url} isLoading={false} pickerText={'Add Image'} />
      <Button title="Salvar" isLoading={isLoading} onPress={handleSaveItems} style={{ marginTop: 10, marginBottom: 10 }} />
    </Form>
  );
}