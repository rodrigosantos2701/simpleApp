import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { Load } from '@components/Animations/Load';
import { Filters } from '@components/Controllers/Filters';
import { Order, OrderProps } from '@components/Controllers/Order';
import { Container, Header, Title, Counter } from './styles';
import { ConfigurationForm } from '@components/Forms/ConfigurationForm';
import { QrCode } from '@components/Forms/QrCodeForm';




export function Orders() {
  const [status, setStatus] = useState('Itens');
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<OrderProps[]>([]);


  // useEffect(() => {
  //   setIsLoading(true);
  // }, []);

  return (
    <Container>
      <Filters onFilter={setStatus} />

      <Header>
        <Title> {status}</Title>
        {status === 'Itens' ? <Counter>{orders.length}</Counter> : <Counter />}
      </Header>
      
      {status === 'Configuração' ? <ConfigurationForm /> : status === 'Link e QrCode'? <QrCode /> : <Counter />}

      {
        isLoading ?
          <Load />
          : <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Order data={item} />}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
          />
      } 
 
    </Container>
  );
}