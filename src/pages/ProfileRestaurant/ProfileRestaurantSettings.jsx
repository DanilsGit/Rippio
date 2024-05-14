import './profileRestaurantSettings.css'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Select from 'react-select'
import { useEffect, useState } from 'react';
import axios from 'axios';

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
        height: 35,
        minHeight: 35
    }),
};

export function ProfileRestaurantSettings() {

    const [departamentos, setDepartamentos] = useState([])
    const [ciudades, setCiudades] = useState([])

    const handleDepartamentoChange = (selectedOption) => {
        console.log(selectedOption);
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

    return (
        <section className='ProfileRestaurantSettings'>
            <h1 className="ProfileRestaurantSettings-h1">Información de tu restaurante</h1>
            <p className="ProfileRestaurantSettings-h2">Administra la información de tu restaurante que verán los usuarios en la página</p>
            <form className="ProfileRestaurantSettings-form">
                <fieldset>
                    <legend className="ProfileRestaurantSettings-Legend">Información general</legend>
                    <div className='ProfileRestaurantSettings-GridForm-nameRestaurant-Div'>
                        <label className="hidden-label" htmlFor="nameRestaurant">Nombre del restaurante</label>
                        <Tippy content='Para cambiar el nombre de tu restaurante, por favor ponte en contacto con el soporte'>
                            <input className='block-input ProfileRestaurantSettings-Input' readOnly type="text" id="nameRestaurant" name="nameRestaurant"
                                placeholder='Nombre de mi restaurante' />
                        </Tippy>
                    </div>
                    <div className='ProfileRestaurantSettings-GridForm-Category-Div'>
                        <label className="hidden-label" htmlFor="category">Categoría principal</label>
                        <Select styles={customStyles} options={categories} placeholder='Categoría principal' />
                    </div>
                    <div className='ProfileRestaurantSettings-GridForm-Category-Div'>
                        <label className="hidden-label" htmlFor="category">Categoría secundaria</label>
                        <Select styles={customStyles} options={categories} placeholder='Categoría secundaria' />
                    </div>
                    <div className='ProfileRestaurantSettings-GridForm-telPrefix-Div'>
                        <label className="hidden-label" htmlFor="telPrefix">Prefijo</label>
                        <input className='block-input ProfileRestaurantSettings-Input' readOnly type="text" id="telPrefix" name="telPrefix"
                            placeholder='+57' />
                    </div>
                    <div className='ProfileRestaurantSettings-GridForm-telNumber-Div'>
                        <label className="hidden-label" htmlFor="telNumber">Número de teléfono</label>
                        <input className='ProfileRestaurantSettings-Input' type="text" id="telNumber" name="telNumber"
                            placeholder='Número de teléfono' />
                    </div>
                </fieldset>
                <fieldset>
                    <legend className="ProfileRestaurantSettings-Legend">Dirección</legend>
                    <div>
                        <label className="label" htmlFor="address">Departamento</label>
                        <Select onChange={handleDepartamentoChange}
                        styles={customStyles} options={departamentos} placeholder='Seleccionar'/>
                    </div>
                    <div>
                        <label className="label" htmlFor="address">Ciudad</label>
                        <Select onChange={(selectedOption) => {console.log(selectedOption)}}
                        styles={customStyles} options={ciudades}  placeholder='Seleccionar' />
                    </div>
                    <div>
                        <label className="label" htmlFor="address">Barrio</label>
                        <input className='ProfileRestaurantSettings-Input' type="text" id="address" name="address"
                            placeholder='Barrio' />
                    </div>
                    <div>
                        <label className="label" htmlFor="tipoVia">Tipo de vía</label>
                        <Select styles={customStyles} options={vias} placeholder='Seleccionar' />
                    </div>
                    <div>
                        <label className="label" htmlFor="address">Dirección</label>
                        <div>
                            <input className='ProfileRestaurantSettings-Input' type="text" id="numAddress" name="numAddress"/>
                                #
                            <input className='ProfileRestaurantSettings-Input' type="text" id="firstNumAddress" name="firstNumAddress"/>
                            -
                            <input className='ProfileRestaurantSettings-Input' type="text" id="secondNumAddress" name="secondNumAddress"/>
                        </div>
                    </div>
                </fieldset>
                <button className='ProfileRestaurantSettings-Button' type="submit">Guardar cambios</button>
            </form>
        </section>
    )
}