import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore'

import { Form, TextInfo, Container, ButtonContainer } from './styles';
import { Input } from '@components/Controllers/Input';
import { Button } from '@components/Controllers/Button';
import { TextArea } from '@components/Controllers/TextArea';
import { EditButton } from '@components/Controllers/EditButton';
import { SaveButton } from '@components/Controllers/SaveButton';


export function QrCode() {
  const [link, setLink] = useState('');
  const [qrcode, setQrcode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleSave() {
    setIsLoading(true);
  }

  return (
    <Container>
      <Form>
        <Input editable={false} placeholder="Link"  />
        <Input editable={false} placeholder="QR Code"  />

      </Form>
    </Container>
  );
}