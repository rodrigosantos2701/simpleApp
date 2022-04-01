import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { Load } from '@components/Animations/Load';
import { Filters } from '@components/Controllers/Filters';
import { Order, OrderProps } from '@components/Controllers/Order';
import { Container, Header, Title, Counter } from './styles';
import { ConfigurationForm } from '@components/Forms/ConfigurationForm';
import { QrCode } from '@components/Forms/QrCodeForm';


const mock = 
[
  {
    id: '1',
    name: 'Produto 123456',
    description: 'Descricão do produto 1234',
    price: '100,50',
    url: 'https://firebasestorage.googleapis.com/v0/b/myhelpdeskproject-476b6.appspot.com/o/erSLjHnIvmSCtIhcTAnAeqRMdg53%2Flogo.jpg?alt=media&token=8699404e-1710-4f33-8a92-b666b3cc6983'
  },
  {
    id: '2',
    name: 'Produto 2',
    description: 'Descricão do produto',
    price: '100,50',
    url: 'https://firebasestorage.googleapis.com/v0/b/myhelpdeskproject-476b6.appspot.com/o/erSLjHnIvmSCtIhcTAnAeqRMdg53%2Flogo.jpg?alt=media&token=8699404e-1710-4f33-8a92-b666b3cc6983'
  },
  {
    id: '3',
    name: 'Produto 3',
    description: 'Descricão do produto',
    price: '100,50',
    url: 'https://firebasestorage.googleapis.com/v0/b/myhelpdeskproject-476b6.appspot.com/o/erSLjHnIvmSCtIhcTAnAeqRMdg53%2Flogo.jpg?alt=media&token=8699404e-1710-4f33-8a92-b666b3cc6983'
  },
  {
    id: '4',
    name: 'Produto 4',
    description: 'Descricão do produto',
    price: '100,50',
    url: 'https://firebasestorage.googleapis.com/v0/b/myhelpdeskproject-476b6.appspot.com/o/erSLjHnIvmSCtIhcTAnAeqRMdg53%2Flogo.jpg?alt=media&token=8699404e-1710-4f33-8a92-b666b3cc6983'
  },
  {
    id: '5',
    name: 'Produto 5',
    description: 'Descricão do produto',
    price: '100,50',
    url: 'https://firebasestorage.googleapis.com/v0/b/myhelpdeskproject-476b6.appspot.com/o/erSLjHnIvmSCtIhcTAnAeqRMdg53%2Flogo.jpg?alt=media&token=8699404e-1710-4f33-8a92-b666b3cc6983'
  },
  {
    id: '6',
    name: 'Produto 6',
    description: 'Descricão do produto',
    price: '100,50',
    url: 'https://firebasestorage.googleapis.com/v0/b/myhelpdeskproject-476b6.appspot.com/o/erSLjHnIvmSCtIhcTAnAeqRMdg53%2Flogo.jpg?alt=media&token=8699404e-1710-4f33-8a92-b666b3cc6983'
  }



]

export function Orders() {
  const [status, setStatus] = useState('Itens');
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [itemDelete, setItemDelete] = useState('');



  useEffect(() => {
    setOrders(mock);
  }, []);

  useEffect(() => {
    Remove()
  },[itemDelete])

  const Remove = () => {
    setOrders(orders => {
      return orders.filter(item => item.id !== itemDelete);
    });
  };

  return (
    <Container>
      <Filters onFilter={setStatus} />

      <Header>
        <Title> {status}</Title>
        {status === 'Itens' ? <Counter>Total: {orders.length}</Counter> : <Counter />}
      </Header>

      {status === 'Configuração'
        ? <ConfigurationForm />
        : status === 'Link e QrCode'
          ? <QrCode />
          : isLoading
            ? <Load />
            : <FlatList
              data={orders}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <Order data={item} setItemDelete={setItemDelete} />}
              contentContainerStyle={{ paddingBottom: 100 }}
              showsVerticalScrollIndicator={false}
              style={{ flex: 1 }}
            />
      }

    </Container>
  );
}