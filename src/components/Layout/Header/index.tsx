import React from 'react';
import { getAuth, signOut } from "firebase/auth";


import { LogoutButton } from '@components/Controllers/LogoutButton';
import { Container, Greeting, Title, SubTitle } from './styles';

export function Header() {
  function handleSignOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }


  return (
    <Container>
      <Greeting>
        <Title>App Pedido Simples</Title>
        <SubTitle>Conte conosco, estamos aqui para ajudar.</SubTitle>
      </Greeting>

      <LogoutButton onPress={handleSignOut} />
    </Container>
  );
}


