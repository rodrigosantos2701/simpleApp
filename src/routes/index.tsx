import React, { useEffect, useState } from "react";
import { Home } from '@screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthRoutes } from './auth.routes';

export function Routes() {
  const auth = getAuth()
  const [loged, setLogged ] = useState<boolean>(false)

  useEffect(() => {
    let mounted = true
    const subScriber =  onAuthStateChanged(auth, (user) => {
      if (user && mounted) {
        setLogged(true)
      } else {
        setLogged(false)
      }
    });
    return function cleanup() {
      mounted = false
    }

}, [])


  return (
    <NavigationContainer>
     {loged? <Home /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
      