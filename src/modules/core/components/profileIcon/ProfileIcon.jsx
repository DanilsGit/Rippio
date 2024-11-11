import { useState } from 'react';
import './ProfileIcon.css'
import { uploadFile } from "@m/core/utils/image";
import axios from 'axios';
import { useAuth } from "@m/core/hooks/useAuth";

export function ProfileIcon() {

    const [loading, setLoading] = useState(false)
    const user = useAuth((state) => state.user)
    const setUser = useAuth((state) => state.setUser)
    const token = useAuth((state) => state.token)

    const handleInputProfileChange = async (e) => {
        setLoading(true);
        const userType = user.tipo_usuario === 3 ? 'RestaurantIcon' : user.tipo_usuario === 1 ? 'UserIcon' : 'AdminIcon';
        try {
            const newImage = await uploadFile(e.target.files[0], userType, user.id);
            await axios.post(`${import.meta.env.VITE_API_URL}/api/profile/modify_profile_image`,
                {
                    image: newImage
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            setUser({ ...user, img_icon: newImage });
        } catch (error) {
            console.error(error);
        }
        e.target.value = null;
        setLoading(false);
    }

    const handleButtonClick = () => {
        const upload = document.getElementById('upload');
        upload.click();
    }

    return (
        <div className="ProfileIconOptionsContainer-uploadIconContainer">
            <img
                className={loading ? "ProfileIconOptions-header-imgProfile loading" : "ProfileIconOptions-header-imgProfile"}
                id="ProfileIcon-imgProfile"
                draggable='false'
                src={loading ? 'https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2Floading.png?alt=media&token=b1a554d7-4784-4f3c-892b-662ff72a3804' : user.img_icon}
                alt="Foto de perfil"
            />
            <label className="hidden-label" htmlFor="upload">Subir imagen:</label>
            <input type="file" id="upload" name="upload" accept=".png, .jpg, .jpeg"
                onChange={handleInputProfileChange} />
            <button className="ProfileIconOptions-header-button" onClick={handleButtonClick}>
                <img draggable='false' className="ProfileIconOptions-header-imgEdit" src="https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png" alt="Upload Icon" />
            </button>
        </div>
    )
}