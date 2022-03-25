import React, { useEffect, useState } from 'react';
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { db } from '../../../services/firebase';
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { Form, TextInfo, Container, ButtonContainer } from './styles';
import { Input } from '@components/Controllers/Input';
import { InputPhone } from '@components/Controllers/InputPhone';
import * as ImagePicker from 'expo-image-picker';
import Picker from '../../Controllers/ImagePicker';
import { EditButton } from '@components/Controllers/EditButton';
import { SaveButton } from '@components/Controllers/SaveButton';
import { Alert, View } from 'react-native';
import MaskInput from 'react-native-mask-input';
import useStorage from '../../../hooks/useStorage';
import { Button } from '@components/Controllers/Button';


export function ConfigurationForm() {
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [whats, setWhats] = useState('');
  const [editable, setEditable] = useState(false)
  const [userId, setUserId] = useState('')
  const [file, setFile] = useState();
  const auth = getAuth();
  const user = auth.currentUser;
  const storage = getStorage();


  useEffect(() => {
    handleGetDataConfigurations()
  }, [user])


  async function handleGetDataConfigurations() {
    if (user) {
      const docRef = doc(db, user.uid, 'config');
      const docSnap = await getDoc(docRef);
      setUserId(user.uid)

      if (docSnap.exists()) {
        const config = docSnap.data()
        const configData = config
        setCompany(configData.company)
        setDescription(configData.description)
        setWhats(configData.whats)
      } else {
        console.log('empty database');
      }
    }
  }


  async function handleSaveConfigurations() {
    const docRef = doc(db, userId, 'config');
    const companyRef = collection(db, userId);
    await setDoc(doc(companyRef, 'config'), {
      company,
      description,
      whats
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
            <Picker />
          </View>
        </Form>
      </Container>
    </View>
  );
}