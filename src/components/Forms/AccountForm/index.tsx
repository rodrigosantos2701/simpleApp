import React, { useState } from 'react';
import { Alert } from 'react-native';

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../services/firebase';

import { Button } from '@components/Controllers/Button';
import { Input } from '@components/Controllers/Input';
import { Form, Title } from './styles';

export function AccountForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

   function handleNewAccount() {
    setIsLoading(true)
       createUserWithEmailAndPassword(auth, email, password)
      .then(() => Alert.alert("Conta","Conta criada com sucesso!"))
      .catch(() => Alert.alert("Verifique se o email esta correto e se a senha tem no minimo 6 digitos contendo letras e numeros"))
      .finally(() => setIsLoading(false))
  }

  return (
    <Form>
      <Title>Cadastrar</Title>
      <Input placeholder="E-mail" onChangeText={setEmail} />
      <Input placeholder="Senha" secureTextEntry onChangeText={setPassword} />
      <Button title="Cadastrar" isLoading={isLoading} onPress={handleNewAccount} />
    </Form>
  );
}