import './RestaurantProfileSettings.css'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Select from 'react-select'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../hooks/useAuth';

const categories = [
    { value: '1', label: 'Comida rápida' },
    { value: '2', label: 'Comida mexicana' },
];

const vias = [
    { value: '1', label: 'Calle' },
    { value: '2', label: 'Carrera' },
    { value: '3', label: 'Diagonal' },
    { value: '4', label: 'Transversal' },
    { value: '5', label: 'Circular' },
    { value: '6', label: 'Avenida' },
];

const customStyles = {
    menu: (provided) => ({
        ...provided,
        zIndex: 9999,
    }),
    control: base => ({
        ...base,
        height: '3.5em',
        minHeight: '3.5em',
    }),
};

export function RestaurantProfileSettings() {

    const [departamentos, setDepartamentos] = useState([])
    const [ciudades, setCiudades] = useState([])

    const handleDepartamentoChange = (selectedOption) => {
        const newCiudades = selectedOption.ciudades.map((ciudad,index) => ({ value: index, label: ciudad }));
        setCiudades(newCiudades);
    }

    useEffect(() => {
        axios.get('https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.min.json')
            .then(response => {
                const newDepartamentos = response.data.map(departamento => ({ value: departamento.id, label: departamento.departamento, ciudades: departamento.ciudades}));
                setDepartamentos(newDepartamentos);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const user = useAuth((state) => state.user)

    // TODO: IMPLEMENTAR PARA RESTAURANTES
    const [newUser, setNewUser] = useState({})

    return (
        <section className='ProfileRestaurantSettings'>
            <h1 className="ProfileRestaurantSettings-h1">Información de tu restaurante</h1>
            <p className="ProfileRestaurantSettings-h2">Administra la información de tu restaurante que verán los usuarios en la página</p>
            <form className="ProfileRestaurantSettings-form">
                <fieldset className='fieldsetInformation'>
                    <legend className="ProfileRestaurantSettings-Legend">Información general</legend>
                    <div className='ProfileRestaurantSettings-GridForm-nameRestaurant-Div'>
                        <label className="hidden-label" htmlFor="nameRestaurant">Nombre del restaurante</label>
                        <Tippy content='Para cambiar el nombre de tu restaurante, por favor ponte en contacto con el soporte'>
                            <input className='block-input ProfileRestaurantSettings-Input' readOnly type="text" id="nameRestaurant" name="nameRestaurant"
                                placeholder={user.nombre} />
                        </Tippy>
                    </div>
                    <div className='ProfileRestaurantSettings-GridForm-nameRestaurant-Div'>
                        <label className="hidden-label" htmlFor="nameRestaurant">Nombre del restaurante</label>
                        <Tippy content='Para cambiar el correo de tu restaurante, por favor ponte en contacto con el soporte'>
                            <input className='block-input ProfileRestaurantSettings-Input' readOnly type="text" id="emailRestaurant" name="emailRestaurant"
                                placeholder={user.email} />
                        </Tippy>
                    </div>
                    <div className='ProfileRestaurantSettings-GridForm-Category-Div'>
                        <label className="hidden-label" htmlFor="category">Categoría principal</label>
                        <Select className='ProfileRestaurantSettings-GridForm-Category-Div-select' styles={customStyles} options={categories} placeholder='Categoría principal' />
                    </div>
                    <div className='ProfileRestaurantSettings-GridForm-Category-Div'>
                        <label className="hidden-label" htmlFor="category">Categoría secundaria</label>
                        <Select className='ProfileRestaurantSettings-GridForm-Category-Div-select' styles={customStyles} options={categories} placeholder='Categoría secundaria' />
                    </div>
                    <div className='ProfileRestaurantSettings-GridForm-telPrefix-Div'>
                        <label className="hidden-label" htmlFor="telPrefix">Prefijo</label>
                        <input className='block-input ProfileRestaurantSettings-Input' readOnly type="text" id="telPrefix" name="telPrefix"
                            placeholder='+57' />
                    </div>
                    <div className='ProfileRestaurantSettings-GridForm-telNumber-Div'>
                        <label className="hidden-label" htmlFor="telNumber">Número de teléfono</label>
                        <input className='ProfileRestaurantSettings-Input' type="number" id="telNumber" name="telNumber" required value={user.telefono}
                            onChange={(e)=>{if (e.target.value.length >=10) e.target.value=e.target.value.slice(0,10) }}
                            placeholder='Número de teléfono' />
                    </div>
                </fieldset>
                <fieldset className='fieldsetAddress'>
                    <legend className="ProfileRestaurantSettings-Legend">Dirección</legend>
                    <div>
                        <label className="label" htmlFor="address">Departamento</label>
                        <Select className='select' onChange={handleDepartamentoChange}
                        styles={customStyles} options={departamentos} placeholder='Seleccionar'/>
                    </div>
                    <div>
                        <label className="label" htmlFor="address">Ciudad</label>
                        <Select className='select' onChange={(selectedOption) => {console.log(selectedOption)}}
                        styles={customStyles} options={ciudades}  placeholder='Seleccionar' />
                    </div>
                    <div>
                        <label className="label" htmlFor="address">Barrio</label>
                        <input className='ProfileRestaurantSettings-Input' type="text" id="address" name="address" required
                            placeholder='Barrio' />
                    </div>
                    <div>
                        <label className="label" htmlFor="tipoVia">Tipo de vía</label>
                        <Select className='select' styles={customStyles} options={vias} placeholder='Seleccionar' />
                    </div>
                    <div className='fieldsetAddress-address-div'>
                        <label className="label" htmlFor="address">Dirección</label>
                        <div>
                            <input className='ProfileRestaurantSettings-Input' required type="text" id="numAddress" name="numAddress"
                            onChange={(e)=>{if (e.target.value.length >=3) e.target.value=e.target.value.slice(0,3) }} 
                            />
                                #
                            <input className='ProfileRestaurantSettings-Input' required type="number" id="firstNumAddress" name="firstNumAddress"
                            onChange={(e)=>{if (e.target.value.length >=2) e.target.value=e.target.value.slice(0,2) }}
                            />
                            -
                            <input className='ProfileRestaurantSettings-Input' required type="number" id="secondNumAddress" name="secondNumAddress"
                            onChange={(e)=>{if (e.target.value.length >=2) e.target.value=e.target.value.slice(0,2) }}
                            />
                        </div>
                    </div>
                </fieldset>
                <button className='ProfileRestaurantSettings-Button' type="submit">Guardar cambios</button>
            </form>
        </section>
    )
}