import React, { useEffect, useState } from 'react';
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
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




export function OrderForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState('')
  const [img, setImg] = useState<any>();
  const [url, setUrl] = useState('');
  const [storageId, setStorageId] = useState('')


  const auth = getAuth();
  const storage = getStorage();
  const user = auth.currentUser;
  const id = uuidv4()


  useEffect(() => {
    handleGetItems()
  }, [user])


  const formValidation = () => {
    if (name !== '' && description !== '' && price !== ''  && img !== undefined) {
      return true
    }
  }

  async function handleGetItems() {
    if (user) {
      const docRef = doc(firestore, user.uid, id);
      const docSnap = await getDoc(docRef);

      setUserId(user.uid)

    } else {
      console.log('error');
    }
  }

  async function handleSaveItems() {
    setIsLoading(true)
    let isValid = formValidation()

    if (!isValid) {
      alert('Preencher todos os campos e selecionar uma imagem ')
      setIsLoading(false)

    } else {

      // const docRef = doc(firestore, userId, id);
      const firestoreRef = collection(firestore, userId);
      const storageRef = ref(storage, userId + `/${id}`);


      //Convert img 
      const newImg = await fetch(img)
      const bytes = await newImg.blob()
      await uploadBytes(storageRef, bytes)

      // //getURL
      const url = await getDownloadURL(ref(storage, userId + `/${id}`))

      setUrl(url)
      // setStorageId(id)

      await setDoc(doc(firestoreRef, id), {
        id,
        name,
        description,
        price,
        url

      })
      Alert.alert(("Salvo com sucesso!"))
      setName('')
      setDescription('')
      setPrice('')
      setUrl('')
      setImg('')
      setIsLoading(false)
    }
  }

  return (
    <Form>
      <Title>Novo Produto/Serviço</Title>
      <Input placeholder="Nome" onChangeText={setName} value={name} />
      <Input placeholder="Descrição" onChangeText={setDescription} value={description} />
      <Input placeholder="Preço" onChangeText={setPrice} value={price} />
      <Picker editable={true} setLogo={setImg} logo={img} url={url} isLoading={false} pickerText={'Add Image'} />
      <Button title="Salvar" isLoading={isLoading} onPress={handleSaveItems} style={{ marginTop: 10, marginBottom: 10 }} />
    </Form>
  );
}