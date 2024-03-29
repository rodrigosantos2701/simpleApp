import React, { useEffect, useState } from 'react';
import { setDoc, doc } from "firebase/firestore";
import { firestore } from '../../../services/firebase';
import { getAuth } from "firebase/auth";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { getStorage, ref, uploadBytes, getMetadata, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { Picker } from '../../Controllers/ImagePicker';

import { Form, Title } from './styles';
import { Input } from '@components/Controllers/Input';
import { Button } from '@components/Controllers/Button';
import { Alert } from 'react-native';


export function OrderForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [enableSaveButton, setEnableSaveButton] = useState(false);
  const [userId, setUserId] = useState('')
  const [img, setImg] = useState<any>();
  const [url, setUrl] = useState('');
  const [uri, setUri] = useState('');
  const [logo, setLogo] = useState<any>();


  const auth = getAuth();
  const user = auth.currentUser;
  const id = uuidv4()

  useEffect(() => {
    handleGetItems()
  }, [])


  async function handleGetItems() {
      if (user) {
        setUserId(user.uid)
      } else {
        console.log('error');
      }
    }
  
  async function handleSaveItems() {

    setIsLoading(true)
    if (logo) {

        const firebaseRef = doc(firestore, userId, id);
        const storage = getStorage();
        const logoPayload = logo
          
        const storageRef = ref(storage, userId + '/' + id);
        const img = await fetch(logo)
        const bytes = await img.blob()

        if (bytes.type ===  'image/png'  || bytes.type === 'image/jpg' || bytes.type === 'image/jpeg') {


          const file = await uploadBytes(storageRef, bytes)
          console.log(file)

          const uploadTask = uploadBytesResumable(storageRef, bytes);
          const uri = await getDownloadURL(ref(storageRef))
          
          uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            const total = snapshot.totalBytes;
              console.log('Upload is ' + progress + '% done');
          }  ,    
          (error) => {
            console.log('error =>', error);
          },
          () => {
              setDoc(firebaseRef, {
              id,
              name,
              description,
              price,
              url: logoPayload,
              uri: uri,
              config: false,
            });
            Alert.alert(("Salvo com sucesso!"))
            setName('')
            setDescription('')
            setPrice('')
            setUrl('')
            setImg('')
            setIsLoading(false)
            setLogo('')
          }
  )

        } else {
        Alert.alert(("A Imagem deve ser PNG, JPG ou JPEG!")),
        setUrl(''),
        setImg(''),
        setIsLoading(false),
        setLogo('')
        }    
    }
   }

  return (
    <Form>
      <Title>Novo Produto/Serviço</Title>
      <Input placeholder="Nome" onChangeText={setName} value={name}  maxLength={50} />
      <Input placeholder="Descrição" onChangeText={setDescription} value={description}  maxLength={70} />
      <Input placeholder="Preço" onChangeText={setPrice} value={price} />
      <Picker editable={true} setLogo={setLogo} logo={logo} url={url} isLoading={false} pickerText={'Add Image'}/>
      {/* <Button title="Salvar"  enabled={logo && name && description && price? true :false} isLoading={isLoading} onPress={handleSaveItems} style={{ marginTop: 10, marginBottom: 10  }} /> */}
      <Button title="Salvar"  enabled={ true } isLoading={isLoading} onPress={handleSaveItems} style={{ marginTop: 10, marginBottom: 10  }} />

    </Form>
  );
}

