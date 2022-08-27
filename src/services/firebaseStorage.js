import { getStorage, ref, uploadBytes, deleteObject } from "firebase/storage";
import 'react-native-get-random-values';


export const saveOnStorage = async ({ isConfigData, userId, logo, id }) => {

  console.log('-------------SAVE----------------');
  console.log(isConfigData);
  console.log(userId);
  console.log(id);


  console.log('------------------------------------');

  if (isConfigData) { id = 'config' }
  const storage = getStorage();
  const storageRef = ref(storage, userId + '/' + id);

  //Convert img         
  const img = await fetch(logo)
  const bytes = await img.blob()
  await uploadBytes(storageRef, bytes)

  console.log('------------------------------------');
  console.log('SALVO COM SUCESSSO');
  console.log('------------------------------------');

}

export const deleteFromStorage = async (id) => {
  console.log('------------DELETE----------------');
  console.log(id);
  console.log('------------------------------------');

  const storage = getStorage();
  const deleteRef = ref(storage, userId + '/' + id);

  // Delete the file
  deleteObject(deleteRef)

  console.log('------------------------------------');
  console.log('DELETED');
  console.log('------------------------------------');


}
