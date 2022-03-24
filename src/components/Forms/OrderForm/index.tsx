import React, { useEffect, useState } from 'react';
import { collection, addDoc, } from "firebase/firestore";
import { db } from '../../../services/firebase';

import { Form, Title } from './styles';
import { Input } from '@components/Controllers/Input';
import { Button } from '@components/Controllers/Button';
import { TextArea } from '@components/Controllers/TextArea';
import { Alert } from 'react-native';

export function OrderForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  async function handleNewOrder() {
    setIsLoading(true)
    try {
      const docRef = await addDoc(collection(db, "21999980199"), {
        name,
        description,
        price
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      Alert.alert(("Salvo com sucesso!"))
      setIsLoading(false)
      setName('')
      setDescription('')
      setPrice('')
  
    }
  }

  return (
    <Form>
      <Title>Novo Produto/Serviço</Title>
      <Input placeholder="Nome" onChangeText={setName} value={name}/>
      <TextArea placeholder="Descrição" onChangeText={setDescription} value={description} />
      <Input placeholder="Preço" onChangeText={setPrice} value={price}/>
      <Input placeholder="Imagem" />


      <Button title="Salvar" isLoading={isLoading} onPress={handleNewOrder} />
    </Form>
  );
}