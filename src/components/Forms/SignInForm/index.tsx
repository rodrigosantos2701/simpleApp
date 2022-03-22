import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';


import { FooterButton } from '@components/Controllers/FooterButton';
import { Button } from '@components/Controllers/Button';
import { Input } from '@components/Controllers/Input';
import { Form, Title, Footer } from './styles';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";



export function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const auth = getAuth();

  function handleSignIn() {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
      })
      // .then(() => navigation.navigate('home'))
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Email e/ou senha inválidos")

      })
      .finally(() => setIsLoading(false))
  }

  function handleForgotPassword() {
    if (!email) {
      Alert.alert("Preencha o campo e-mail!")
    } else {
      sendPasswordResetEmail(auth, email)
        .then(() => Alert.alert("Email", "Email de reset com sucesso!"))
        .finally(() => setIsLoading(false))
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Alert.alert("Email inválido")
        })
    }
  }

  return (
    <Form>
      <Title>Entrar</Title>
      <Input placeholder="E-mail" onChangeText={setEmail} />
      <Input placeholder="Senha" secureTextEntry onChangeText={setPassword} />
      <Button title="Entrar" onPress={handleSignIn} isLoading={isLoading} />

      <Footer>
        <FooterButton title="Criar conta" icon="person-add" onPress={() => navigation.navigate('register')} />
        <FooterButton title="Esqueci senha" icon="email" onPress={handleForgotPassword} />
      </Footer>
    </Form>
  );
}