import 'tippy.js/dist/tippy.css';
import Select from 'react-select'
import axios from 'axios';
import './profileDirections.css';
import '../../api/address.jsx';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { addAddress } from '../../api/address';

const vias = [
    { value: '1', label: 'Calle' },
    { value: '2', label: 'Carrera' },
    { value: '3', label: 'Diagonal' },
    { value: '4', label: 'Transversal' },
    { value: '5', label: 'Circular' },
    { value: '6', label: 'Avenida' },
];

export function ProfileDirections() {
    
    const user = useAuth((state) => state.user)
    const token = useAuth((state) => state.token)
    const [loadingAddress, setLoadingAddress] = useState(false);

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

    const [newUser, setNewUser] = useState({})
    
    const customStyles = {
        menu: (provided) => ({
            ...provided,
            zIndex: 9999,
        }),
        menuList: (provided, state) => ({
            ...provided,
            overflow: 'auto',
            scrollbarWidth: 'thin',
            scrollbarColor: '#ffffff #0c818141 ',
        }),
        control: base => ({
            ...base,
            height: '3em',
            minHeight: '3em',
        }),
        
    };

    // Función para ocultar/mostrar el formulario de dirección
    const [open, setOpen] = useState(false)
    console.log('open', open);
    const [arrow, setArrow] = useState(false);

    function handleToggle(index) {
        setArrow(!arrow);
        const miDiv = document.querySelector(`#form-${index}`);
        miDiv.classList.toggle('open');
        const newForms = forms.map((form, i) => {
            if (i === index) {
                return { ...form, isOpen: !form.isOpen, arrow: !form.arrow };
            } else {
                return { ...form, isOpen: false, arrow: false };
            }
        });
        setForms(newForms);
    }

    // Función para editar la dirección
    function handleEditClick(index) {
        // Hacer que los campos vuelvan a ser editables
        const newForms = forms.map((form, i) => {
            if (i === index) {
                return { ...form, isConfirmed: false };
            } else {
                return form;
            }
        });
        setForms(newForms);
        //...
    }

    // Función para el botón de confirmar la dirección
    async function handleConfirmClick(index) {

        // Impedir que el usuario modifique el input al confirmar
            const newForms = [...forms];
            newForms[index].isConfirmed = true;
            setForms(newForms);
        // ...
    }
    // Función para añadir una nueva dirección
    const [forms, setForms] = useState([{ isConfirmed: false , arrow: false}]);

    function handleAddAddressClick() {
        setForms([...forms, {}]);
    }


    return (
        <section className='ProfileDirections'>
            <h1 className="ProfileDirections-h1">Información de residencia</h1>
            <p className="ProfileDirections-h2">Administra la información de tu residencia para la correcta llegada de tus pedidos.</p>
            <div className='ProfileDirections-form-container'>
                {forms.map((form, index) => (
                    <div className='' key={index}>
                        <button className='ProfileDirections-active' onClick={() => handleToggle(index)}>Dirección
                                        {form.arrow ?
                                            <img src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FupArrow.png?alt=media&token=4014049e-5578-4b03-be3f-f36cdbf35dd0' alt='arrow-up' className='information-buttonArrow' />
                                            :
                                            <img src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FdownArrow.png?alt=media&token=2eb9a78a-94b0-4c11-b2c0-41788a4f46cc' alt='arrow-down' className='information-buttonArrow' />}
                        </button>
                            <form id={`form-${index}`} className={`ProfileDirections-form ${form.isOpen ? 'open' : ''}`}>
                                <fieldset className='fieldsetAddressProfile'>
                                <div>
                                    <label className="label" htmlFor="address">Departamento</label>
                                    <Select className='select' onChange={handleDepartamentoChange}  maxMenuHeight={150}
                                    styles={customStyles} options={departamentos} placeholder='Seleccionar' isDisabled={form.isConfirmed} />
                                </div>
                                <div>
                                    <label className="label" htmlFor="address">Ciudad</label>
                                    <Select className='select' onChange={(selectedOption) => {console.log(selectedOption)}} maxMenuHeight={150}
                                    styles={customStyles} options={ciudades}  placeholder='Seleccionar' isDisabled={form.isConfirmed} />
                                </div>
                                <div>
                                    <label className="label" htmlFor="address">Barrio</label>
                                    <input className='ProfileDirections-Input' type="text" id="address" name="address" required
                                        placeholder='Ej. Nuevo Principe' readOnly={form.isConfirmed}  />
                                </div>
                                <div className='div-tipoVia'>
                                    <label className="label" htmlFor="tipoVia">Tipo de vía</label>
                                    <Select className='select selectvia' styles={customStyles} options={vias} placeholder='Seleccionar'  isDisabled={form.isConfirmed} maxMenuHeight={115} />
                                </div>
                                <div className='fieldsetAddressProfile-address-div'>
                                    <label className="label" htmlFor="address">Dirección</label>
                                    <div>
                                        <input className='ProfileDirections-Input' required type="text" id="numAddress" name="numAddress"  readOnly={form.isConfirmed}
                                        onChange={(e)=>{if (e.target.value.length >=3) e.target.value=e.target.value.slice(0,3) }} 
                                        />
                                            #
                                        <input className='ProfileDirections-Input' required type="text" id="firstNumAddress" name="firstNumAddress"  readOnly={form.isConfirmed}
                                        onChange={(e)=>{if (e.target.value.length >=3) e.target.value=e.target.value.slice(0,3) }}
                                        />
                                        -
                                        <input className='ProfileDirections-Input' required type="number" id="secondNumAddress" name="secondNumAddress" readOnly={form.isConfirmed}
                                        onChange={(e)=>{if (e.target.value.length >=3) e.target.value=e.target.value.slice(0,3) }}
                                        />
                                    </div>
                                </div>
                                <div className='textarea-address-div'>
                                    <label className="label" htmlFor="observaciones">Observaciones</label>
                                    <textarea className='ProfileDirections-Input' required type="text" id="address" name="address"  readOnly={form.isConfirmed}/>
                                </div>
                                <button type="button" className='ProfileDirections-Button-Edit' onClick={() => handleEditClick(index)}>Editar</button>
                                <button type="button" className='ProfileDirections-Button-Confirm' onClick={() => handleConfirmClick(index)}>Confirmar</button> 
                            </fieldset>
                            </form>   
                    </div>
                ))}
            </div>
            <button type="button" className='ProfileDirections-Button' onClick={handleAddAddressClick}>Añadir nueva dirección</button>
        </section>
    )
}