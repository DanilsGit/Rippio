import './profileSettings.css'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useAuth } from '@m/core/hooks/useAuth';
import { useState } from 'react';
import axios from 'axios';


export function ProfileSettings() {
    const user = useAuth((state) => state.user);
    const token = useAuth((state) => state.token);
    const setUser = useAuth((state) => state.setUser);
    const [message, setMessage] = useState(null);

    const [newUser, setNewUser] = useState({
        nombre: user.nombre,
        apellido: user.apellido,
        telefono: user.telefono,
    });

    const [updatingInfo, setUpdatingInfo] = useState(false);

    const handleOnSubmitUpdateInfo = async (e) => {
        e.preventDefault();
        setUpdatingInfo(true);
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/profile/edit`,
                {
                    nombre: newUser.nombre,
                    apellido: newUser.apellido,
                    telefono: newUser.telefono
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(() => {
                    setUpdatingInfo(false);
                    setUser({ ...user, ...newUser });
                    setMessage('Datos actualizados correctamente');
                    setTimeout(() => {
                        setMessage(null);
                    }, 3000);
                })

        } catch (error) {
            console.error(error);
            setMessage(`Error al actualizar los datos: ${error.response.data.message}`); // error.response.data.message
            setTimeout(() => {
                setMessage(null);
            }, 3000);
        }
        setUpdatingInfo(false);
    }

    return (
        <section className='ProfileSettings'>
            <h1 className="ProfileSettings-h1">Información de tu cuenta</h1>
            {
                message && <p
                    style={{ textAlign: 'center', color: message.includes('Error') ? 'red' : 'green' }}
                >{message}</p>
            }
            <form onSubmit={handleOnSubmitUpdateInfo}
                className="ProfileSettings-GridForm">
                <div>
                    <label htmlFor="name">Nombre(s)</label>
                    <input value={newUser.nombre}
                        onChange={(e) => setNewUser((user) => ({ ...user, nombre: e.target.value }))}
                        className='ProfileSettingsInput' required type="text" id="name" name="name" minLength='4' maxLength='25' />
                </div>
                <div>
                    <label htmlFor="lastName">Apellido(s)</label>
                    <input value={newUser.apellido}
                        onChange={(e) => setNewUser((user) => ({ ...user, apellido: e.target.value }))}
                        className='ProfileSettingsInput' required type="text" id="lastName" name="lastName" minLength='4' maxLength='25' />
                </div>
                <div>
                    <label htmlFor="email">Correo electrónico</label>
                    <Tippy content='Para cambiar la dirección de correo electrónico, por favor ponte en contacto con el soporte'>
                        <input className='block-input ProfileSettingsInput' readOnly type="email" id="email" name="email"
                            value={user.email} />
                    </Tippy>
                </div>
                <div>
                    <label htmlFor="phone">Teléfono</label>
                    <input value={newUser.telefono}
                        onChange={(e) => { if (e.target.value.length <= 10) setNewUser((user) => ({ ...user, telefono: e.target.value })) }}
                        className='ProfileSettingsInput' required type="tel" id="phone" name="phone" />
                </div>
                <div className='ProfileSettings-GridForm-btnContainer'>
                    <button type="submit">
                        {
                            updatingInfo
                                ? '...'
                                : 'Actualizar Datos'
                        }
                    </button>

                </div>

            </form>
        </section>
    )
}