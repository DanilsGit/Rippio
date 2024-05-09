import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useState } from "react";


export function useImage(url) {

    const [image, setImage] = useState('')

    const firebaseConfig = {
        apiKey: "AIzaSyCTGxgcRumGdJl2MhiISQStGaU3EhvqbTs",
        authDomain: "rippio.firebaseapp.com",
        projectId: "rippio",
        storageBucket: "rippio.appspot.com",
        messagingSenderId: "411384309178",
        appId: "1:411384309178:web:c0b20376a4a11d5c106983",
        measurementId: "G-EEZBVZ41LF"
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
