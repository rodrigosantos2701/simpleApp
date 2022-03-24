import React, { useEffect, useState } from 'react';
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { db } from '../../../services/firebase';
import { getAuth } from "firebase/auth";

import { Form, TextInfo, Container, ButtonContainer } from './styles';
import { Input } from '@components/Controllers/Input';
import { EditButton } from '@components/Controllers/EditButton';
import { SaveButton } from '@components/Controllers/SaveButton';
import { Alert } from 'react-native';



export function ConfigurationForm() {
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [whats, setWhats] = useState('');
  const [editable, setEditable] = useState(false)
  const [userId, setUserId] = useState('')
  const auth = getAuth();
  const user = auth.currentUser;

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
        <Input editable={editable} placeholder="WhastApp" onChangeText={setWhats} value={whats} />
        <Input editable={editable} placeholder="Logo" />
      </Form>
    </Container>
  );
}