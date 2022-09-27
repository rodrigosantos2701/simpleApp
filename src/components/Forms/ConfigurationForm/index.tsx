import React, { useEffect, useState } from 'react';

import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from '../../../services/firebase';
import { getAuth } from "firebase/auth";

import { Form, TextInfo, Container, ButtonContainer } from './styles';
import { View, ScrollView } from 'react-native';

import { Input } from '@components/Controllers/Input';
import { InputPhone } from '@components/Controllers/InputPhone';
import { Picker } from '../../Controllers/ImagePicker';
import { EditButton } from '@components/Controllers/EditButton';
import { SaveButton } from '@components/Controllers/SaveButton';
import { Load } from '../../Animations/Load'
import { saveOnStorage } from '../../../services/firebaseStorage'
import { getStorage, ref, uploadBytes, deleteObject, getDownloadURL } from "firebase/storage";




export function ConfigurationForm() {
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [whats, setWhats] = useState('');
  const [editable, setEditable] = useState(false)
  const [userId, setUserId] = useState('')
  const [logo, setLogo] = useState<any>();
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [ifExists, setIfExists] = useState(false)


  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    handleGetDataConfigurations()
  }, [user])


  async function handleGetDataConfigurations() {
    if (user) {
      const docRef = doc(firestore, user.uid, 'config');
      const docSnap = await getDoc(docRef);

      setUserId(user.uid)

      if (docSnap.exists()) {
        const config = docSnap.data()
        const configData = config

        setCompany(configData.company)
        setDescription(configData.description)
        setWhats(configData.whats)
        setUrl(configData.url)
        setIfExists(true)

      } else {
        console.log('empty_database');
      }
    }
    setTimeout(() => { setIsLoading(false) }, 1000)
  }

  async function handleSaveConfigurations() {
    try{
      if (ifExists) {
        const storage = getStorage();
        const firebaseRef = doc(firestore, userId, "config");
        const storageRef = ref(storage, userId + '/' + "config");
       
        const img = await fetch(logo)
        const bytes = await img.blob()
        const uri = await getDownloadURL(ref(storageRef))

        await updateDoc(firebaseRef, {
          company,
          description,
          whats,
          url: logo || '',
          uri: uri,
        });
        setEditable(false)
        await uploadBytes(storageRef, bytes)
        alert('Atualizado com sucesso!')

      } else {

        saveOnStorage({ isConfigData: true, userId, logo  }  as any)
        const storage = getStorage();
        const storageRef = ref(storage, userId + '/' + "config");
        const firebaseRef = doc(firestore, userId, "config");
        const uri = await getDownloadURL(ref(storageRef))

        await setDoc(firebaseRef, {
          company,
          description,
          whats,
          url: logo || '',
          uri: uri,

        });
        setEditable(false)
        alert('Salvo com sucesso!')
      }
    }
    catch(error){console.log(error)}
    }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Container >
        <ButtonContainer>
          <TextInfo>{editable ? 'Salvar' : 'Editar'}</TextInfo>
          {editable
            ?
            <SaveButton onPress={handleSaveConfigurations} />
            : <EditButton onPress={() => setEditable(!editable)} />
          }
        </ButtonContainer>
        <Form>
          {isLoading ? <Load /> :
            <>
              <Input editable={editable} placeholder="Empresa" onChangeText={setCompany} value={company} />
              <Input editable={editable} placeholder="Descrição" onChangeText={setDescription} value={description} />
              <InputPhone
                editable={editable}
                placeholder="WhatsApp"
                onChangeText={(masked: any, unmasked: any) => { setWhats(masked); }}
                mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                value={whats} />
              <View>
                <Picker editable={editable} setLogo={setLogo} logo={logo} url={url} isLoading={isLoading} pickerText={'Add Logo'} />
              </View>
            </>

          }
        </Form>
      </Container>
    </ScrollView>
  );
}