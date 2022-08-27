import React, { useEffect, useState } from 'react';
import { collection, addDoc, setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from './firebase';
import { getAuth } from "firebase/auth";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';



const auth = getAuth();
const user = auth.currentUser;
const id = uuidv4()


export const saveOnStorage  = async ({configData, userId}) =>   {
    console.log('%cMyProject%cline:16%cuserId', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(131, 175, 155);padding:3px;border-radius:2px', userId)



    if (configData) {
        id = 'config'
        return
    }

    const companyRef = collection(firestore, userId);

    const storage = getStorage();
    const storageRef = ref(storage, userId + id);

  //   //Convert img 
    const img = await fetch(logo)
    const bytes = await img.blob()
    await uploadBytes(storageRef, bytes)

  //   // //getURL
    const url = await getDownloadURL(ref(storage, userId + id))

    // await setDoc(doc(companyRef, 'config'), {
    //   url

    // })
    console.log((" ===> Salvo com sucesso!"))

}
