import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

interface UploadImageProps {
  saveLocation: string;
  file: File;
}
export async function uploadImageToStorage({
  saveLocation,
  file,
}: UploadImageProps): Promise<string> {
  try {
    // Initialize Firebase storage

    // Create a reference for the image with the event title as the folder name
    const storageRef = ref(storage, saveLocation);

    // Upload the image file
    const snapshot = await uploadBytes(storageRef, file);

    // Get the download URL
    const url = await getDownloadURL(snapshot.ref);

    return url;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}
