import React, { useEffect, useState, useMemo, memo, useCallback } from 'react';
import { FlatList } from 'react-native';
import { doc, deleteDoc } from "firebase/firestore";
import { firestore } from '../../../services/firebase';
import { getAuth } from "firebase/auth";
import { MaterialIcons } from '@expo/vector-icons';
import { collection, query, where, getDocs } from "firebase/firestore";

import { Load } from '@components/Animations/Load';
import { Filters } from '@components/Controllers/Filters';
import { OrderProps } from '@components/Controllers/Order';
import Order from '@components/Controllers/Order'
import { Container, Header, Title, Counter } from './styles';
import { ConfigurationForm } from '@components/Forms/ConfigurationForm';
import { QrCode } from '@components/Forms/QrCodeForm';


export const Orders = ({setPrimaryButton}: any) => {
  const [status, setStatus] = useState('Itens');
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [itemDelete, setItemDelete] = useState('');
  const [userId, setUserId] = useState('')
  const [firstLoad, setFirstLoad] = useState(true);

  const auth = getAuth();
  const user = auth.currentUser;


  useEffect(() => {
    RemoveItemFromFirebase()
  }, [itemDelete])

  const RemoveItemFromFirebase = async () => {
    await deleteDoc(doc(firestore, userId, itemDelete))
    setOrders(orders => {
      return orders.filter(item => item.id !== itemDelete);
    });
  };

  const handleGetItems = useCallback(async () => {
    let a: OrderProps[] = []


    if (user) {
      const q = query(collection(firestore, user.uid), where("id", "!=", ''));
      const querySnapshot = await getDocs(q)

      querySnapshot.docs.map((doc) => {
        let newDoc = doc.data()
        let addDoc: OrderProps = {
          "description": newDoc.description,
          "id": newDoc.id,
          "name": newDoc.name,
          "price": newDoc.price,
          "url": newDoc.url,
        }
        a.push(addDoc)
        setOrders([...a])
      });
      setUserId(user.uid)
    }
    setTimeout(() => { setIsLoading(false), setFirstLoad(false) }, 1000)

  }
    , [])

  useEffect(() => {
    if (firstLoad) {
      handleGetItems()
    }
    setFirstLoad(false)
  }, [])


  return (
    <Container>
      <Filters setPrimaryButton={setPrimaryButton} onFilter={setStatus} />

      <Header>
          {status === 'Itens' ? <Title >{status} ({orders.length})</Title> : <Title >{status}</Title>}
          {status === 'Itens' ? <MaterialIcons name='refresh' size={26} onPress={handleGetItems}></MaterialIcons>  : <Counter  />}
      </Header>


      {status === 'Configuração'
        ? <ConfigurationForm />
        : status === 'Link e QrCode'
          ? <QrCode userId={userId} />
          : isLoading
            ? <Load />
            :
           
            <FlatList
              data={orders}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <Order key={item.id} data={item} setItemDelete={setItemDelete} userId={userId} />}
              contentContainerStyle={{ paddingBottom: 100 }}
              showsVerticalScrollIndicator={false}
              style={{ flex: 1 }}
            />
      }

    </Container>
  );
}

