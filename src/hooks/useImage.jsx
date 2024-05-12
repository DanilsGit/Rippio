import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useState } from "react";


export function useImage(url) {

    const [image, setImage] = useState('')

    const firebaseConfig = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
        measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
    };


        const app = initializeApp(firebaseConfig);
        const storage = getStorage(app);

        const storageRef = ref(storage,
            url);
        getDownloadURL(storageRef)
            .then((url) => {
                setImage(url)
            })
            .catch((error) => {
                console.error("Error al obtener la URL de descarga:", error);
            });
    return {
        image
    }
}
