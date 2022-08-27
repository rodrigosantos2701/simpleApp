import React, { useState } from 'react';

import { Container } from './styles';
import { Header } from '@components/Layout/Header';
import { Orders }  from '@components/Lists/Orders';
import { NewOrder } from '@components/Controllers/NewOrder';


export function Home() {
  
  const [ primaryButton, setPrimaryButton ] = useState('newItem');

  return (
    <Container>
      <Header />
      <Orders setPrimaryButton={setPrimaryButton}/>
      { primaryButton === 'newItem'? <NewOrder />: null } 
    </Container>
  );
}