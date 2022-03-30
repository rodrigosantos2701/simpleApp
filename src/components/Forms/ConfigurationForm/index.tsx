import React, { useEffect, useState } from 'react';
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { firestore } from '../../../services/firebase';
import { getAuth } from "firebase/auth";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { Form, TextInfo, Container, ButtonContainer } from './styles';
import { Input } from '@components/Controllers/Input';
import { InputPhone } from '@components/Controllers/InputPhone';
import * as ImagePicker from 'expo-image-picker';
import Picker from '../../Controllers/ImagePicker';
import { EditButton } from '@components/Controllers/EditButton';
import { SaveButton } from '@components/Controllers/SaveButton';
import { Alert, View, Image } from 'react-native';
import MaskInput from 'react-native-mask-input';
import { Button } from '@components/Controllers/Button';
// import useStorage from '../../../hooks/useStorage';




export function ConfigurationForm() {
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [whats, setWhats] = useState('');
  const [editable, setEditable] = useState(false)
  const [userId, setUserId] = useState('')
  const [logo, setLogo] = useState<any>();
  const [url, setUrl] = useState('');

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    setLogo(null)
  },[url])

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
      } else {
        console.log('empty database');
      }
    }
  }

  async function handleSaveConfigurations() {
    const docRef = doc(firestore, userId, 'config');
    const companyRef = collection(firestore, userId);
    const storage = getStorage();
    const storageRef = ref(storage, userId + '/logo.jpg');

    //Convert img 
    const img = await fetch(logo)
    const bytes = await img.blob()
    await uploadBytes(storageRef, bytes)

    //getURL
    const url = await getDownloadURL(ref(storage, userId + '/logo.jpg'))

    setUrl(url)

    await setDoc(doc(companyRef, 'config'), {
      company,
      description,
      whats,
      url

    })
    Alert.alert(("Salvo com sucesso!"))
    setEditable(false)

  }

  return (
    <View>
      <Container>
        <ButtonContainer>
          <TextInfo>{editable ? 'Salvar' : 'Editar'}</TextInfo>
          {editable
            ? <SaveButton onPress={handleSaveConfigurations} />
            : <EditButton onPress={() => setEditable(!editable)} />
          }
        </ButtonContainer>
        <Form>
          <Input editable={editable} placeholder="Empresa" onChangeText={setCompany} value={company} />
          <Input editable={editable} placeholder="Descrição" onChangeText={setDescription} value={description} />
          <InputPhone
            editable={editable}
            placeholder="WhatsApp"
            onChangeText={(masked: any, unmasked: any) => { setWhats(masked); }}
            mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            value={whats}
          />
          <View>
            <Picker editable={editable} setLogo={setLogo} logo={logo} url={url}/>
          </View>
        </Form>
      </Container>
    </View>
  );
}