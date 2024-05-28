/* eslint-disable react/prop-types */
import './ProfileIcon.css'

export function ProfileIcon({ loading, handleInputProfileChange, handleButtonClick, user}) {
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