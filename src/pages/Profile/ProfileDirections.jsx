import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Select from 'react-select'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import './profileDirections.css';


const vias = [
    { value: '1', label: 'Calle' },
    { value: '2', label: 'Carrera' },
    { value: '3', label: 'Diagonal' },
    { value: '4', label: 'Transversal' },
    { value: '5', label: 'Circular' },
    { value: '6', label: 'Avenida' },
];

export function ProfileDirections() {

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

    const [newUser, setNewUser] = useState({})
    
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

    return (
        <section className='ProfileDirections'>
            <h1 className="ProfileDirections-h1">Información de residencia</h1>
            <p className="ProfileDirections-h2">Administra la información de tu residencia para la correcta llegada de tus pedidos.</p>
            <form className="ProfileDirections-form">
                <fieldset className='fieldsetAddress'>
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
                        <input className='ProfileDirections-Input' type="text" id="address" name="address" required
                            placeholder='Ej. Nuevo Principe' />
                    </div>
                    <div className='div-tipoVia'>
                        <label className="label" htmlFor="tipoVia">Tipo de vía</label>
                        <Select className='select selectvia' styles={customStyles} options={vias} placeholder='Seleccionar' />
                    </div>
                    <div className='fieldsetAddress-address-div'>
                        <label className="label" htmlFor="address">Dirección</label>
                        <div>
                            <input className='ProfileDirections-Input' required type="text" id="numAddress" name="numAddress"
                            onChange={(e)=>{if (e.target.value.length >=3) e.target.value=e.target.value.slice(0,3) }} 
                            />
                                #
                            <input className='ProfileDirections-Input' required type="number" id="firstNumAddress" name="firstNumAddress"
                            onChange={(e)=>{if (e.target.value.length >=2) e.target.value=e.target.value.slice(0,2) }}
                            />
                            -
                            <input className='ProfileDirections-Input' required type="number" id="secondNumAddress" name="secondNumAddress"
                            onChange={(e)=>{if (e.target.value.length >=2) e.target.value=e.target.value.slice(0,2) }}
                            />
                        </div>
                    </div>
                </fieldset>
                <button className='ProfileDirections-Button' type="submit">Guardar cambios</button>
            </form>
        </section>
    )
}