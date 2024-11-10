import Select from 'react-select'
import './profileAddress.css';
import '@/api/address.jsx';
import { useManageAddress } from '../../hooks/custom-hooks';
import { useColombiaDepartments } from '@m/core/hooks/useColombiaDepartments';

const vias = [
    { value: '1', label: 'Calle' },
    { value: '2', label: 'Carrera' },
    { value: '3', label: 'Diagonal' },
    { value: '4', label: 'Transversal' },
    { value: '5', label: 'Circular' },
    { value: '6', label: 'Avenida' },
];


export function ProfileAddress() {
    // Obtener los departamentos
    const { departamentos } = useColombiaDepartments();

    // Manejar las direcciones
    const { handleSetForms, forms, loadingForm, loadingAddress, handleToggle, handleConfirmClick, handleAddAddressClick, handleDeleteClick, handleDepartamentChange, ciudades, handleEditClick } = useManageAddress();

    // Apariencia de los Select
    const customStyles = {
        menu: (provided) => ({
            ...provided,
            zIndex: 9999,
        }),
        menuList: (provided) => ({
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
                                                <Select className='Direction-Select'
                                                    onChange={(selectedOption) => handleDepartamentChange(selectedOption, form)} maxMenuHeight={150}
                                                    value={form.departamento}
                                                    required
                                                    styles={customStyles} options={departamentos} placeholder='Seleccionar' isDisabled={form.isConfirmed} />
                                            </div>
                                            <div>
                                                <label className="label" htmlFor="address">Ciudad</label>
                                                <Select className='Direction-Select' maxMenuHeight={150}
                                                    value={form.ciudad}
                                                    required
                                                    onChange={
                                                        (selectedOption) => {
                                                            const newForms = forms.map((f) =>
                                                                f.id === form.id ? { ...f, ciudad: selectedOption } : f
                                                            );
                                                            handleSetForms(newForms);
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
                                                            handleSetForms(newForms);
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
                                                            handleSetForms(newForms);
                                                        }}
                                                    value={form.tipo_via}
                                                    required
                                                    className='Direction-Select selectvia' styles={customStyles} options={vias} placeholder='Seleccionar' isDisabled={form.isConfirmed} maxMenuHeight={115} />
                                            </div>
                                            <div className='fieldsetAddressProfile-address-div'>
                                                <label className="label" htmlFor="address">Dirección</label>
                                                <div>
                                                    <input className='ProfileDirections-Input' required type="text" id="numAddress" name="numAddress" readOnly={form.isConfirmed} value={form.numero_via} maxLength='3'
                                                        onChange={(e) => {
                                                            const newForms = forms.map((f) =>
                                                                f.id === form.id ? { ...f, numero_via: e.target.value } : f
                                                            );
                                                            handleSetForms(newForms);
                                                        }}
                                                    />
                                                    #
                                                    <input className='ProfileDirections-Input' required type="text" id="firstNumAddress" name="firstNumAddress" readOnly={form.isConfirmed} value={form.numero_uno} maxLength='3'
                                                        onChange={(e) => {
                                                            const newForms = forms.map((f) =>
                                                                f.id === form.id ? { ...f, numero_uno: e.target.value } : f
                                                            );
                                                            handleSetForms(newForms);
                                                        }}
                                                    />
                                                    -
                                                    <input className='ProfileDirections-Input' required type="text" id="secondNumAddress" name="secondNumAddress" readOnly={form.isConfirmed} value={form.numero_dos} maxLength='3'
                                                        onChange={(e) => {
                                                            const newForms = forms.map((f) =>
                                                                f.id === form.id ? { ...f, numero_dos: e.target.value } : f
                                                            );
                                                            handleSetForms(newForms);
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
                                                        handleSetForms(newForms);
                                                    }}
                                                    className='ProfileDirections-Input' type="text" id="address" name="address" readOnly={form.isConfirmed} value={form.observaciones} />
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