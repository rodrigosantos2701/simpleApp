import React, { useState } from 'react';

import { Form, Title } from './styles';
import { Input } from '@components/Controllers/Input';
import { Button } from '@components/Controllers/Button';
import { TextArea } from '@components/Controllers/TextArea';

export function OrderForm() {
  const [patrimony, setPatrimony] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleNewOrder() {
    setIsLoading(true);
  }

  return (
    <Form>
      <Title>Novo Produto/Serviço</Title>
      <Input placeholder="Nome" onChangeText={setPatrimony} />
      <TextArea placeholder="Descrição" onChangeText={setDescription} />
      <Input placeholder="Preço" onChangeText={setPatrimony} />
      <Input placeholder="Imagem" onChangeText={setPatrimony} />


      <Button title="Salvar" isLoading={isLoading} onPress={handleNewOrder} />
    </Form>
  );
}