import Select from 'react-select'
import axios from 'axios';
import './profileDirections.css';
import '../../api/address.jsx';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { addAddress, getAddresses, editAddress, deleteAddress } from '../../api/address';

const vias = [
    { value: '1', label: 'Calle' },
    { value: '2', label: 'Carrera' },
    { value: '3', label: 'Diagonal' },
    { value: '4', label: 'Transversal' },
    { value: '5', label: 'Circular' },
    { value: '6', label: 'Avenida' },
];

export function ProfileDirections() {

    const token = useAuth((state) => state.token)
    const [loadingAddress, setLoadingAddress] = useState(false);
    const [loadingForm, setLoadingForm] = useState(true);
    // Función para ocultar/mostrar el formulario de dirección

    // Funcionalidad de los Select
    const [departamentos, setDepartamentos] = useState([])
    const [ciudades, setCiudades] = useState([])
    const handleDepartamentoChange = (selectedOption) => {
        const newCiudades = selectedOption.ciudades.map((ciudad, index) => ({ value: index, label: ciudad }));
        setCiudades(newCiudades);
    }

    // Función para añadir una nueva dirección
    const [forms, setForms] = useState([]); // true en las 3 para que el formulario salga abierto al recargar la página


    // Obtener los departamentos de Colombia
    useEffect(() => {
        axios.get('https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.min.json')
            .then(response => {
                const newDepartamentos = response.data.map(departamento => ({ value: departamento.id, label: departamento.departamento, ciudades: departamento.ciudades }));
                setDepartamentos(newDepartamentos);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    // Obtener las direcciones del usuario
    useEffect(() => {
        getAddresses(token).then((response) => {
            const directions = response.data;
            const newDirections = directions.map((direction) =>
            ({
                ...direction,
                departamento: { value: direction.departamento, label: direction.departamento },
                ciudad: { value: direction.ciudad, label: direction.ciudad },
                tipo_via: { value: direction.tipo_via, label: direction.tipo_via },
                isOpen: false,
                isConfirmed: true,
                arrow: false
            }));
            setForms(newDirections);
            setLoadingForm(false);
        }).catch((error) => {
            console.log(error);
            setLoadingForm(false);
        });
        
    }, [token]);


    // Apariencia de los Select
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

    // Función para abrir y cerrar el formulario
    function handleToggle(id) {
        const miDiv = document.querySelector(`#form-${id}`);
        miDiv.classList.toggle('open');
        // Hacer que los campos no sean editables
        const newForms = forms.map((form) => {
            if (form.id === id) {
                return { ...form, isOpen: !form.isOpen, arrow: !form.arrow };
            } else {
                return form;
            }
        });
        setForms(newForms);
    }

    // Función para editar la dirección
    function handleEditClick(id) {
        // Hacer que los campos vuelvan a ser editables
        console.log(forms);
        const newForms = forms.map((form) => {
            if (form.id === id) {
                return { ...form, isConfirmed: false };
            } else {
                return form;
            }
        });
        setForms(newForms);
    }

    // Función para enviar una nueva dirección
    const sentNewAddress = async (address) => {
        setLoadingAddress(true);
        try {
            const res = await addAddress(token, address);
            //res tiene el id de la dirección creada
            // Actualizar el id de la dirección creada
            const newAddress = { ...address,
                id: res.data.id,
                departamento: { value: address.departamento, label: address.departamento },
                ciudad: { value: address.ciudad, label: address.ciudad },
                tipo_via: { value: address.tipo_via, label: address.tipo_via },
            }

            // Borrar el formulario con id 'new' y añadir el nuevo formulario
            const newForms = forms.filter((form) => form.id !== 'new');
            newForms.push(newAddress);

            // Hacer que los campos no sean editables, cerrar el formulario y quitar la flecha
            newForms.forEach((form) => {
                if (form.id === newAddress.id) {
                    form.isConfirmed = true;
                    form.isOpen = false;
                    form.arrow = false;
                }
            });

            setForms(newForms);
        } catch (error) {
            console.log(error);
        }
        setLoadingAddress(false);
    }

    // Función para enviar una dirección actualizada
    const updateAddress = async (address) => {
        setLoadingAddress(true);
        try {
            const addressWithId = { ...address, id_direccion: address.id };
            await editAddress(token, addressWithId);
            // Hacer que los campos no sean editables y cerrar el formulario
            const newForms = forms.map((form) => {
                if (form.id === address.id) {
                    return { ...form, isConfirmed: true, isOpen: false, arrow: false };
                } else {
                    return form;
                }
            });
            setForms(newForms);
        } catch (error) {
            console.log(error);
        }
        setLoadingAddress(false);
    }

    // Función para el botón de confirmar la dirección
    const handleConfirmClick = (e, id) => {
        e.preventDefault();
        // { EJEMPLO DE DIRECCIÓN
        //     "id_direccion":73,
        //     "departamento": "Valle del Cauca",
        //     "ciudad": "Tuluá" , 
        //     "barrio": "Alvernia" ,
        //     "tipo_via": "Calle" ,
        //     "numero_via": "42a" ,
        //     "numero_uno": "25" ,
        //     "numero_dos": 51,
        //     "observaciones":"Pregunta por don cesar"
        // }
        const address = forms.find((form) => form.id === id);
        if (id === 'new') {
            const addressToSend = {
                departamento: address.departamento.label,
                ciudad: address.ciudad.label,
                barrio: address.barrio,
                tipo_via: address.tipo_via.label,
                numero_via: address.numero_via,
                numero_uno: address.numero_uno,
                numero_dos: address.numero_dos,
                observaciones: address.observaciones
            };
            sentNewAddress(addressToSend);
        } else {
            const addressToEdit = {
                id: address.id,
                departamento: address.departamento.label,
                ciudad: address.ciudad.label,
                barrio: address.barrio,
                tipo_via: address.tipo_via.label,
                numero_via: address.numero_via,
                numero_uno: address.numero_uno,
                numero_dos: address.numero_dos,
                observaciones: address.observaciones
            };
            updateAddress(addressToEdit);
        }
    }


    // Función para añadir una nueva dirección
    function handleAddAddressClick() {
        //Verificamos si ya se está creando una dirección
        if (forms.some((form) => form.id === 'new')) {
            return;
        }

        //Se cierran los formularios abiertos y se añade uno nuevo
        const newForms = forms.map((form) => ({ ...form, isOpen: false, arrow: false }));
        newForms.push({
            id: 'new',
            departamento: '',
            ciudad: '',
            barrio: '',
            tipo_via: '',
            numero_via: '',
            numero_uno: '',
            numero_dos: '',
            observaciones: '',
            isOpen: true,
            isConfirmed: false,
            arrow: true
        });
        setForms(newForms);
    }

    // Función para eliminar una dirección
    const handleDeleteClick = async (id) => {
        try {
            if (id === 'new') {
                const newForms = forms.filter((form) => form.id !== 'new');
                setForms(newForms);
                return;
            }else{
                await deleteAddress(token, id);
                const newForms = forms.filter((form) => form.id !== id);
                setForms(newForms);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className='ProfileDirections'>
            <h1 className="ProfileDirections-h1">Información de residencia</h1>
            <p className="ProfileDirections-h2">Administra la información de tu residencia para la correcta llegada de tus pedidos.</p>
            {
                loadingForm
                ? <p>Cargando...</p>
                :
                forms.length > 0
                    ?
                    <div className='ProfileDirections-form-container'>
                        {forms.map((form) => ( // Arreglo de formularios
                            <div className='' key={form.id}>
                                <div className='ProfileDirections-Button-Container'>
                                    <button className='ProfileDirections-active' onClick={() => handleToggle(form.id)} type='button'>
                                        {
                                            form.id === 'new' ? 'Nueva dirección' :
                                                `${form.ciudad.label}, ${form.barrio} ${form.tipo_via.label} ${form.numero_via} #${form.numero_uno}-${form.numero_dos}`
                                        }
                                        {form.arrow ?
                                            <img src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FupArrow.png?alt=media&token=4014049e-5578-4b03-be3f-f36cdbf35dd0' alt='arrow-up' className='information-buttonArrow' />
                                            :
                                            <img src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FdownArrow.png?alt=media&token=2eb9a78a-94b0-4c11-b2c0-41788a4f46cc' alt='arrow-down' className='information-buttonArrow' />}
                                    </button>
                                    <button className='ProfileDirections-Button-Delete' type='button'
                                        onClick={() => handleDeleteClick(form.id)}
                                    >
                                        {
                                            form.id === 'new' ? 'Cancelar' : 'Eliminar'
                                        }
                                    </button>
                                </div>
                                <form id={`form-${form.id}`} className={`ProfileDirections-form ${form.isOpen ? 'open' : ''}`}
                                    onSubmit={(e) => handleConfirmClick(e, form.id)}
                                >
                                    <fieldset className='fieldsetAddressProfile'>
                                        <div>
                                            <label className="label" htmlFor="address">Departamento</label>
                                            <Select className='select' onChange={
                                                (selectedOption) => {
                                                    handleDepartamentoChange(selectedOption);
                                                    const newForms = forms.map((f) =>
                                                        f.id === form.id ? { ...f, departamento: selectedOption } : f
                                                    );
                                                    setForms(newForms);
                                                }
                                            } maxMenuHeight={150}
                                                value={form.departamento}
                                                required
                                                styles={customStyles} options={departamentos} placeholder='Seleccionar' isDisabled={form.isConfirmed} />
                                        </div>
                                        <div>
                                            <label className="label" htmlFor="address">Ciudad</label>
                                            <Select className='select' maxMenuHeight={150}
                                                value={form.ciudad}
                                                required
                                                onChange={
                                                    (selectedOption) => {
                                                        const newForms = forms.map((f) =>
                                                            f.id === form.id ? { ...f, ciudad: selectedOption } : f
                                                        );
                                                        setForms(newForms);
                                                    }}
                                                styles={customStyles} options={ciudades} placeholder='Seleccionar' isDisabled={form.isConfirmed} />
                                        </div>
                                        <div>
                                            <label className="label" htmlFor="address">Barrio</label>
                                            <input
                                                onChange={
                                                    (e) => {
                                                        const newForms = forms.map((f) =>
                                                            f.id === form.id ? { ...f, barrio: e.target.value } : f
                                                        );
                                                        setForms(newForms);
                                                    }
                                                }
                                                className='ProfileDirections-Input' type="text" id="address" name="address" required
                                                value={form.barrio}
                                                placeholder='Ej. Nuevo Principe' readOnly={form.isConfirmed} />
                                        </div>
                                        <div className='div-tipoVia'>
                                            <label className="label" htmlFor="tipoVia">Tipo de vía</label>
                                            <Select
                                                onChange={
                                                    (selectedOption) => {
                                                        const newForms = forms.map((f) =>
                                                            f.id === form.id ? { ...f, tipo_via: selectedOption } : f
                                                        );
                                                        setForms(newForms);
                                                    }}
                                                value={form.tipo_via}
                                                required
                                                className='select selectvia' styles={customStyles} options={vias} placeholder='Seleccionar' isDisabled={form.isConfirmed} maxMenuHeight={115} />
                                        </div>
                                        <div className='fieldsetAddressProfile-address-div'>
                                            <label className="label" htmlFor="address">Dirección</label>
                                            <div>
                                                <input className='ProfileDirections-Input' required type="text" id="numAddress" name="numAddress" readOnly={form.isConfirmed} value={form.numero_via} maxLength='3'
                                                    onChange={(e) => {
                                                        const newForms = forms.map((f) =>
                                                            f.id === form.id ? { ...f, numero_via: e.target.value } : f
                                                        );
                                                        setForms(newForms);
                                                    }}
                                                />
                                                #
                                                <input className='ProfileDirections-Input' required type="text" id="firstNumAddress" name="firstNumAddress" readOnly={form.isConfirmed} value={form.numero_uno} maxLength='3'
                                                    onChange={(e) => {
                                                        const newForms = forms.map((f) =>
                                                            f.id === form.id ? { ...f, numero_uno: e.target.value } : f
                                                        );
                                                        setForms(newForms);
                                                    }}
                                                />
                                                -
                                                <input className='ProfileDirections-Input' required type="text" id="secondNumAddress" name="secondNumAddress" readOnly={form.isConfirmed} value={form.numero_dos} maxLength='3'
                                                    onChange={(e) => {
                                                        const newForms = forms.map((f) =>
                                                            f.id === form.id ? { ...f, numero_dos: e.target.value } : f
                                                        );
                                                        setForms(newForms);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className='textarea-address-div'>
                                            <label className="label" htmlFor="observaciones">Observaciones</label>
                                            <textarea
                                                onChange={(e) => {
                                                    const newForms = forms.map((f) =>
                                                        f.id === form.id ? { ...f, observaciones: e.target.value } : f
                                                    );
                                                    setForms(newForms);
                                                }}
                                                className='ProfileDirections-Input' required type="text" id="address" name="address" readOnly={form.isConfirmed} value={form.observaciones} />
                                        </div>

                                        {
                                            form.id === 'new' ?
                                                <button className='ProfileDirections-Button-Confirm'>
                                                    {loadingAddress ? '...' : 'Confirmar'}
                                                </button>
                                                :
                                                <>
                                                    <button type="button" className='ProfileDirections-Button-Edit' onClick={() => handleEditClick(form.id)}>Editar</button>
                                                    <button className='ProfileDirections-Button-Confirm'>
                                                        {loadingAddress ? '...' : 'Confirmar'}
                                                    </button>
                                                </>
                                        }

                                    </fieldset>
                                </form>
                            </div>
                        ))}
                    </div>
                    : <p>No hay direcciones registradas</p>
                
            }
            <button type="button" className='ProfileDirections-Button' onClick={handleAddAddressClick}>Añadir nueva dirección</button>
        </section>
    )
}