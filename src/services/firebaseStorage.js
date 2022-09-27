import { getStorage, ref, uploadBytes, deleteObject, getDownloadURL } from "firebase/storage";
import 'react-native-get-random-values';


export const saveOnStorage = async ({ isConfigData, userId, logo }) => {

const storage = getStorage();

  if (isConfigData) { id = 'config' };
  const storageRef = ref(storage, userId + '/' + id);
  if (logo == null) return;

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
