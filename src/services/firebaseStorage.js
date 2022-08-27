import { getStorage, ref, uploadBytes, deleteObject } from "firebase/storage";
import 'react-native-get-random-values';


export const saveOnStorage = async ({ isConfigData, userId, logo, id }) => {


  if (isConfigData) { id = 'config' }
  const storage = getStorage();
  const storageRef = ref(storage, userId + '/' + id);

  //Convert img         
  const img = await fetch(logo)
  const bytes = await img.blob()
  await uploadBytes(storageRef, bytes)


}

export const deleteFromStorage = async (id) => {
  const storage = getStorage();
  const deleteRef = ref(storage, userId + '/' + id);

  // Delete the file
  deleteObject(deleteRef)



}
