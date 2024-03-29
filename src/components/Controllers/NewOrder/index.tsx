import React, { useRef } from 'react';
import { BottomSheetView, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { Background } from './styles';
import { Button } from '@components/Controllers/Button';
import { OrderForm } from '@components/Forms/OrderForm';

export function NewOrder() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  function handleSnapPress() {
    bottomSheetRef.current?.present();
  }


  return (
    <>
      <Button title="Novo Item" onPress={handleSnapPress} />

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetRef}
          snapPoints={['80%']}
          style={{ padding: 24 }}
          enablePanDownToClose={true}
          backdropComponent={() => <Background />}
        >
          <BottomSheetView>
            <OrderForm />
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
}