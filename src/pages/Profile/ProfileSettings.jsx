import './profileSettings.css'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';


export function ProfileSettings() {
    const user = useAuth((state) => state.user);

    const [newUser, setNewUser] = useState({
        nombre: user.nombre,
        apellido: user.apellido,
        telefono: user.telefono,
    });


    return (
        <section className='ProfileSettings'>
            <h1 className="ProfileSettings-h1">Información de tu cuenta</h1>
            <form onSubmit={(e)=>{e.preventDefault(); console.log(newUser)}}
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
                    onChange={(e) => {if (e.target.value.length <= 10) setNewUser((user) => ({ ...user, telefono: e.target.value }))}}
                    className='ProfileSettingsInput' required type="tel" id="phone" name="phone" />
                </div>
                <div>
                    <label htmlFor="address">Dirección</label>
                    <input readOnly className='ProfileSettingsInput' required type="text" id="address" name="address" />
                </div>
                <div className='ProfileSettings-GridForm-btnContainer'>
                    <button type="submit">Actualizar datos</button>
                </div>
            </form>
        </section>
    )
}