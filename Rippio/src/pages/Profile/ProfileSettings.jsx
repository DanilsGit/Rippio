import './profileSettings.css'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

export function ProfileSettings() {
    return (
        <section className='ProfileSettings'>
            <h1 className="ProfileSettings-h1">Información de tu cuenta</h1>
            <form className="ProfileSettings-GridForm">
                <div>
                    <label htmlFor="name">Nombre(s)</label>
                    <input className='ProfileSettingsInput' required type="text" id="name" name="name" />
                </div>
                <div>
                    <label htmlFor="lastName">Apellido(s)</label>
                    <input className='ProfileSettingsInput' required type="text" id="lastName" name="lastName" />
                </div>
                <div>
                    <label htmlFor="email">Correo electrónico</label>
                    <Tippy content='Para cambiar la dirección de correo electrónico, por favor ponte en contacto con el soporte'>
                        <input className='block-input ProfileSettingsInput' readOnly type="email" id="email" name="email"
                        value='micorreobonito@gmail.com' />
                    </Tippy>
                </div>
                <div>
                    <label htmlFor="phone">Teléfono</label>
                    <input className='ProfileSettingsInput' required type="tel" id="phone" name="phone" />
                </div>
                <div>
                    <label htmlFor="address">Dirección</label>
                    <input className='ProfileSettingsInput' required type="text" id="address" name="address" />
                </div>
                <div className='ProfileSettings-GridForm-btnContainer'>
                    <button type="submit">Actualizar datos</button>
                </div>
            </form>
        </section>
    )
}