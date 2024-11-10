import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

export async function uploadImageToStorage(values: any): Promise<string> {
  try {
    // Initialize Firebase storage

    // Create a reference for the image with the event title as the folder name
    const storageRef = ref(storage, `events/${values.event.title}`);

    // Upload the image file
    const snapshot = await uploadBytes(storageRef, values.event.imageUrl);

    // Get the download URL
    const url = await getDownloadURL(snapshot.ref);

    return url;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}
