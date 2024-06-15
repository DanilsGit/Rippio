import 'tippy.js/dist/tippy.css';
import Select from 'react-select'
import './ProfilePaymentMethods.css';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getPayments, getTypeOfPayment, addPayment, deletePayment } from '../../api/payment';

export function ProfilePaymentMethods() {

    const token = useAuth((state) => state.token)
    const [arrow, setArrow] = useState(false);
    const [loading, setLoading] = useState(null);
    const [metodos_pago, setMetodos_pago] = useState([]);
    const [error, setError] = useState(null);
    const [loadingForms, setLoadingForms] = useState(true);

    //Estado para obtener los métodos de pago del usuario
    const [forms, setForms] = useState(null);

    //Estado para tener los métodos de pago existentes en la BD
    const [typeOfPayments, setTypeOfPayments] = useState([]);

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

    //Icono de las franquicias
    const cardIcons = {
        1: { image: 'https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/ProfilePage%2FPaymentMethodsCards%2FcardIcons%2FAmericanExpress.png?alt=media&token=a2acd094-f28d-48d0-ac05-9054f4e67280' },
        2: { image: 'https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/ProfilePage%2FPaymentMethodsCards%2FcardIcons%2FMasterCard.png?alt=media&token=84c20e32-0b8c-44ab-a678-362d952b9921' },
        3: { image: 'https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/ProfilePage%2FPaymentMethodsCards%2FcardIcons%2FVisa.png?alt=media&token=35442c80-7bc5-4eda-93e9-8274606a957f' }
    };

    //Añadir los metodos de pago al select
    useEffect(() => {
        setMetodos_pago(typeOfPayments.map((type) => ({ value: type.id, label: type.nombre })) || []);
    }, [typeOfPayments]);

    //Obtener los métodos de pago existentes y Obtener los métodos de pago del usuario
    useEffect(() => {
        getTypeOfPayment(token).then((response) => {
            const typeOfPayments = response.data;
            setTypeOfPayments(typeOfPayments);

            getPayments(token).then((response) => {
                const payments = response.data; //Es un array de objetos con la información de los métodos de pago del usuario
                const newForm = payments.map((payment) => {
                    return {
                        id: payment.id,
                        id_metodo_pago: payment.id_metodo_pago,
                        nombre: payment.nombre,
                        apellido: payment.apellido,
                        numero: payment.numero,
                        formattedNum: payment.numero.replace(/(\d{4})/g, '$1 ').trim(),
                        expiracion: payment.expiracion,
                        formattedExpiracion: payment.expiracion,
                        cvv: payment.cvv,
                        isConfirmed: true,
                        arrow: false,
                        selectedOption: typeOfPayments.find((type) => type.id === payment.id_metodo_pago),
                        isSaved: true,
                        imagen: typeOfPayments.find((type) => type.id === payment.id_metodo_pago)?.card_icon || null
                    }
                });
                setForms(newForm);
                setLoadingForms(false);
            }).catch((error) => {
                console.log(error);
                setForms([]);
                setLoadingForms(false);
            });

        }).catch((error) => {
            console.log(error);
        });

    }, [token])

    function handleToggle(id) {
        setArrow(!arrow);
        const miDiv = document.querySelector(`#form-${id}`);
        miDiv.classList.toggle('open');
        const newForms = forms.map((form) => {
            if (form.id === id) {
                return { ...form, isOpen: !form.isOpen, arrow: !form.arrow };
            } else {
                return { ...form, isOpen: false, arrow: false };
            }
        });
        setForms(newForms);
    }

    // Función para el botón de confirmar 
    const handleConfirmClick = async (e, id) => {
        e.preventDefault();
        setLoading(true);
        // Impedir que el usuario modifique el input al confirmar
        // Ejemplo de data
        // const {
        //     id_tipo_tarjeta,
        //     nombre,
        //     apellido,
        //     numero_tarjeta,
        //     fecha_vencimiento,
        //     cvv,
        //   } = req.body;

        const myForm = forms.find((form) => form.id === id);

        const data = {
            Id_tipoTarjeta: Number(myForm.selectedOption.value),
            nombre: myForm.nombre,
            apellido: myForm.apellido,
            numero_tarjeta: myForm.numero,
            fecha_vencimiento: myForm.expiracion.slice(0, 2) + '/' + myForm.expiracion.slice(2),
            cvv: myForm.cvv
        };
        await addPayment(token, data).then((res) => {
            const id = res.data.id;
            console.log(id);
            const newForms = forms.map((form) => {
                if (form.id === 'new') {
                    return { ...form, id, isConfirmed: true, isSaved: true, isOpen: false, arrow: false };
                } else {
                    return form;
                }
            });
            setForms(newForms);
            setError(null);
        }).catch((error) => {
            console.log(error);
            if (error.response.data.message) {
                setError(error.response.data.message);
            }
        });
        setLoading(false);
    }

    // Función para eliminar una tarjeta
    const handleDeleteClick = async (id) => {
        setLoading(true);
        const id_credit_card = { id_credit_card: id }
        await deletePayment(token, id_credit_card).then(() => {
            const newForms = forms.filter((form) => form.id !== id);
            setForms(newForms);
        }).catch((error) => {
            console.log(error);
        });
        setLoading(false);
    }

    // Función para cancelar la creación de una tarjeta
    const handleCancelClick = (id) => {
        const newForms = forms.filter((form) => form.id !== id);
        setForms(newForms);
    }

    // Función para añadir una nueva tarjeta
    function handleAddpaymentmethodClick() {
        //Si ya existe una id con el nombre 'new', no se añade otra
        if (forms.some((form) => form.id === 'new')) {
            return;
        }
        // Se cierran los formularios abiertos
        const closedForms = forms.map((form) => ({ ...form, isOpen: false, arrow: false }));
        const newForm = [...closedForms, {
            id: 'new',
            id_metodo_pago: null,
            nombre: '',
            apellido: '',
            numero: '',
            formattedNum: '',
            expiracion: '',
            formattedExpiracion: '',
            cvv: '',
            isConfirmed: false,
            isOpen: true,
            arrow: true,
            selectedOption: null,
            isSaved: false
        }]
        setForms(newForm);
    }

    const handleCardNumberChange = (e, id) => {
        const newForms = forms.map((form) => {
            if (form.id === id) {
                const num = e.target.value;
                const cleanedNum = num.replace(/\D/g, ''); // Para no permitir poner caracteres que no sean números
                const formattedNum = cleanedNum.replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim(); // Para que cada 4 digitos haya un espacio
                //Mantiene los numeros sin formatear en la propiedad numero, pero muestra el numero formateado en el input
                return { ...form, numero: num, formattedNum };
            } else {
                return form;
            }
        });
        setForms(newForms);
    };

    // Función para la fecha de expiración de la tarjeta (poner el /)
    const handleExpiryDateChange = (e, id) => {
        const newForms = forms.map((form) => {
            if (form.id === id) {
                const expiracion = e.target.value.replace(/\D/g, ''); // Para no permitir poner caracteres que no sean números
                const formattedExpiracion = expiracion.replace(/\s+/g, '').replace(/(\d{2})/g, '$1/').trim().slice(0, 5); // Para que cada 2 digitos haya un /
                return { ...form, expiracion, formattedExpiracion };
            } else {
                return form;
            }
        });
        setForms(newForms);
    };

    // Función para cambiar colores de la tarjeta por banco
    const handleSelectChange = (id, selectedOption) => {
        // la imagen está en typeOfPayments
        const newForms = forms.map((form) => {
            if (form.id === id) {
                return { ...form, selectedOption, imagen: typeOfPayments.find((type) => type.id == selectedOption.value).card_icon };
            } else {
                return form;
            }
        });
        setForms(newForms);
    };

    return (
        <section className='ProfilePaymentMethods'>
            <h1 className="ProfilePaymentMethods-h1">Tu cartera en Rippio</h1>
            {
                loadingForms ? <p>Cargando...</p> :
                    forms.length > 0 ?
                        <div className='ProfilePaymentMethods-form-container'>
                            {forms.map((form) => ( // Arreglo de formularios
                                <div className='' key={form.id}>
                                    <div className='ProfilePaymentMethods-button-container'>
                                        <button className='ProfilePaymentMethods-active' onClick={() => handleToggle(form.id)}>
                                            Tarjeta {form.isSaved ? form.numero.slice(0, 4) + ' ❋❋❋❋ ❋❋❋❋ ' + '❋❋' + form.numero.slice(-2) : 'Nueva'}
                                            {
                                                form.arrow ?
                                                    <img src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FupArrow.png?alt=media&token=4014049e-5578-4b03-be3f-f36cdbf35dd0' alt='arrow-up' className='information-buttonArrow' />
                                                    :
                                                    <img src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FdownArrow.png?alt=media&token=2eb9a78a-94b0-4c11-b2c0-41788a4f46cc' alt='arrow-down' className='information-buttonArrow' />
                                            }
                                        </button>
                                    </div>
                                    <form
                                        onSubmit={(e) => handleConfirmClick(e, form.id)}
                                        id={`form-${form.id}`} className={`ProfilePaymentMethods-form ${form.isOpen ? 'open' : ''}`}>
                                        <div className='div-banco'>
                                            {!form.isSaved && <Select className='select selecbank' required styles={customStyles} options={metodos_pago} placeholder='Selecciona tu banco' isDisabled={form.isConfirmed} maxMenuHeight={115} onChange={option => handleSelectChange(form.id, option)} value={form.selectedOption} />}
                                        </div>
                                        <div className={`ProfilePaymentMethods-form-card`} style={form.imagen ? {
                                            // Cambiar el background de la tarjeta dependiendo del banco, la imagen está en typeOfPayments
                                            backgroundImage: `url(${form.imagen})`
                                        } : {}}
                                        >
                                            {
                                                form.numero.length >= 4
                                                && <img draggable='false' className='ProfilePaymentMethods-franchise' src={
                                                    form.numero.startsWith('4') ? cardIcons[3].image :
                                                        form.numero.startsWith('5') ? cardIcons[2].image :
                                                            (form.numero.startsWith('34') || form.numero.startsWith('37')) ? cardIcons[1].image :
                                                                null
                                                }></img>
                                            }
                                            <div className={`ProfilePaymentMethods-form-card-number`}>
                                                <input className='ProfilePaymentMethods-Input' type="text" id="paymentmethodNum" name="paymentmethod" required
                                                    placeholder='Número de tarjeta' readOnly={form.isConfirmed} value={form.formattedNum} onChange={(e) => { handleCardNumberChange(e, form.id) }} maxLength="19" />
                                            </div>
                                            <div className='ProfilePaymentMethods-form-card-date'>
                                                <input className='ProfilePaymentMethods-Input' type="text" id="paymentmethodDate" name="paymentmethod" required
                                                    placeholder='MM/AA' readOnly={form.isConfirmed} value={form.formattedExpiracion} onChange={(e) => { handleExpiryDateChange(e, form.id) }} maxLength="5" />

                                                <input className='ProfilePaymentMethods-Input' type="text" id="paymentmethodCvv" name="paymentmethod" required
                                                    value={form.cvv}
                                                    onChange={(e) => {
                                                        const cvv = e.target.value;
                                                        if (cvv.length > 3) return;
                                                        const newForms = forms.map((form) => {
                                                            if (form.id === form.id) {
                                                                return { ...form, cvv };
                                                            } else {
                                                                return form;
                                                            }
                                                        });
                                                        setForms(newForms);
                                                    }}
                                                    placeholder='CVV' readOnly={form.isConfirmed} maxLength="3" />
                                            </div>
                                            <div className='ProfilePaymentMethods-form-card-name'>
                                                <input className='ProfilePaymentMethods-Input' type="text" id="paymentmethodName" name="paymentmethod" required
                                                    value={form.nombre}
                                                    onChange={(e) => {
                                                        const nombre = e.target.value;
                                                        const newForms = forms.map((form) => {
                                                            if (form.id === form.id) {
                                                                return { ...form, nombre };
                                                            } else {
                                                                return form;
                                                            }
                                                        });
                                                        setForms(newForms);
                                                    }}
                                                    placeholder='Nombre' readOnly={form.isConfirmed} />
                                                <input className='ProfilePaymentMethods-Input' type="text" id="paymentmethodLastName" name="paymentmethod" required
                                                    value={form.apellido}
                                                    onChange={(e) => {
                                                        const apellido = e.target.value;
                                                        const newForms = forms.map((form) => {
                                                            if (form.id === form.id) {
                                                                return { ...form, apellido };
                                                            } else {
                                                                return form;
                                                            }
                                                        });
                                                        setForms(newForms);
                                                    }}
                                                    placeholder='Apellido' readOnly={form.isConfirmed} />
                                            </div>
                                        </div>
                                        {
                                            error && <p
                                                style={{ color: 'red', textAlign: 'center' }}
                                            >{error}</p>
                                        }
                                        {!form.isSaved && <button className='ProfilePaymentMethods-Button-Confirm'>
                                            {
                                                loading ? 'Cargando...' : 'Confirmar'
                                            }
                                        </button>}
                                        {
                                            form.isSaved ?
                                                <button className='ProfilePaymentMethods-Button-Delete' type='button' onClick={() => handleDeleteClick(form.id)}>
                                                    {
                                                        loading ? 'Cargando...' : 'Eliminar'
                                                    }
                                                </button>
                                                : <button className='ProfilePaymentMethods-Button-Delete' type='button' onClick={() => handleCancelClick(form.id)}>Cancelar</button>
                                        }

                                    </form>
                                </div>
                            ))}
                        </div>
                        : <p>No tienes métodos de pago registrados</p>
            }
            <button type="button" className='ProfilePaymentMethods-Button' onClick={handleAddpaymentmethodClick}>Añadir una nueva tarjeta</button>
        </section>
    )
}