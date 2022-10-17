import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore'
import * as Clipboard from 'expo-clipboard';
import QRCode from 'react-native-qrcode-svg';

import { QRCodeContainer, TextInfo, Container, ButtonContainer } from './styles';
import { Input } from '@components/Controllers/Input';
import { AddToClipBoardButton } from '@components/Controllers/AddToClipboardButton'
import { View } from 'react-native';


type props = {
  userId: string
}

export function QrCode({ userId }: props) {
  const [link, setLink] = useState('');
  const [qrcode, setQrcode] = useState('');
  const [copiedText, setCopiedText] = useState('https://simpleapporderclientside.firebaseapp.com/?id=' + userId);



  const copyToClipboard = () => {
    Clipboard.setString(copiedText);
    alert('Copiado com sucesso!')
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
  };


  return (
    <>
    <Container>
      <ButtonContainer>
        <TextInfo>Copiar Link</TextInfo>
        <AddToClipBoardButton enabled={true} onPress={copyToClipboard} />
      </ButtonContainer>
      <Input editable={false} placeholder={copiedText} />
    </Container>
      <QRCodeContainer>
        <QRCode value={copiedText} size={150}/>
      </QRCodeContainer>
    </>
  );
}