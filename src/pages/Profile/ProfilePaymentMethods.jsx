import 'tippy.js/dist/tippy.css';
import Select from 'react-select'
import './ProfilePaymentMethods.css';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';


const metodos_pago = [
    { value: '1', label: 'Nequi' },
    { value: '2', label: 'Bancolombia' },
    { value: '3', label: 'Davivienda' },
    { value: '4', label: 'Falabella' },
    { value: '6', label: 'Nu' },
    { value: '7', label: 'American Express' },
    { value: '8', label: 'Banco de Bogotá' },
    { value: '10', label: 'BBVA' },
    { value: '11', label: 'Caja Social' },
    { value: '12', label: 'AV Villas' }
];

export function ProfilePaymentMethods() {
    
    const user = useAuth((state) => state.user)
    const token = useAuth((state) => state.token)



    const [newUser, setNewUser] = useState({})
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

    // Función para ocultar/mostrar el formulario de la tarjeta
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


    // Función para el botón de confirmar 
    function handleConfirmClick(index) {
        // Impedir que el usuario modifique el input al confirmar
        const newForms = [...forms];
        newForms[index].isConfirmed = true;
        newForms[index].isSaved = true;
        setForms(newForms);
        // ...
    }

    // Función para añadir una nueva tarjeta
    const [forms, setForms] = useState([{ isConfirmed: false , arrow: false, selectedOption: null, isSaved: false}]); 

    function handleAddpaymentmethodClick() {
        setForms([...forms, {}]);
    }

    // Función para ponerle formato al número de la tarjeta (que cada 4 digitos haya un espacio)
    const [cardNumbers, setCardNumbers] = useState([]);

    const handleCardNumberChange = (index) => (event) => {
        let value = event.target.value.replace(/\D/g, ''); // Elimina cualquier caracter que no sea un número
        value = value.replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim();

    const newCardNumbers = [...cardNumbers]; 
    newCardNumbers[index] = value;
    setCardNumbers(newCardNumbers);
    //...
    };

    // Función para la fecha de expiración de la tarjeta (poner el /)
    const [expiryDates, setExpiryDates] = useState([]);

    const handleExpiryDateChange = (index) => (event) => {
        let value = event.target.value.replace(/\D/g, ''); // Para no permitir poner caracteres que no sean números
        value = value.replace(/\s+/g, '').replace(/(\d{2})/g, '$1/').trim().slice(0,5); // Para que cada 2 digitos haya un /
    
        const newExpiryDates = [...expiryDates]; 
        newExpiryDates[index] = value;
        setExpiryDates(newExpiryDates);
        //...
    };

    // Función para sacar las opciones del select y así cambiar el color de la tarjeta
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelectChange = (index, selectedOption) => {
        const newForms = [...forms];
        newForms[index].selectedOption = selectedOption;
        setForms(newForms);
    };

    const optionStyles = { // Lista de imágenes según el id (ya sigue el orden de la BD)
        1: { backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/ProfilePage%2FPaymentMethodsCards%2FRippioCard1.png?alt=media&token=9f080dc5-9ee8-4199-9d7f-e03d9c2f6ce4)' },
        2: { backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/ProfilePage%2FPaymentMethodsCards%2FRippioCard2.png?alt=media&token=20764118-ae75-4cde-ae52-d883b73de54e)' },
        3: { backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/ProfilePage%2FPaymentMethodsCards%2FRippioCard3.png?alt=media&token=6839b075-43d4-4bab-9ad9-3f280976ec35)' },
        4: { backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/ProfilePage%2FPaymentMethodsCards%2FRippioCard4.png?alt=media&token=0a84a176-57eb-4a43-a2c9-29f157db927c)' },
        6: { backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/ProfilePage%2FPaymentMethodsCards%2FRippioCard6.png?alt=media&token=4e052426-a15e-454c-b49e-41e511d96b49)' },
        7: { backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/ProfilePage%2FPaymentMethodsCards%2FRippioCard7.png?alt=media&token=f76edc41-7e60-48dd-bb74-1db6eb2baee5)' },
        8: { backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/ProfilePage%2FPaymentMethodsCards%2FRippioCard8.png?alt=media&token=48fd18ae-d121-40d1-a0d0-4ecb2a9b0e01)' },
        10: { backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/ProfilePage%2FPaymentMethodsCards%2FRippioCard10.png?alt=media&token=e40a13b3-4991-4876-b98a-ed1c28a3b872)' },
        11: { backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/ProfilePage%2FPaymentMethodsCards%2FRippioCard11.png?alt=media&token=70c041e1-abad-4a71-a47c-e891c071bc64)' },
        12: { backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/ProfilePage%2FPaymentMethodsCards%2FRippioCard12.png?alt=media&token=ece06e90-f707-415e-8e8b-aab56d75023a)' },
    };

    const cardIcons = {
        1: { image: 'url(https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/ProfilePage%2FPaymentMethodsCards%2FcardIcons%2FAmericanExpress.png?alt=media&token=a2acd094-f28d-48d0-ac05-9054f4e67280)'},
        2: { image: 'url(https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/ProfilePage%2FPaymentMethodsCards%2FcardIcons%2FMasterCard.png?alt=media&token=84c20e32-0b8c-44ab-a678-362d952b9921)'},
        3: { image: 'url(https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/ProfilePage%2FPaymentMethodsCards%2FcardIcons%2FVisa.png?alt=media&token=35442c80-7bc5-4eda-93e9-8274606a957f)'}
    };

    return (
        <section className='ProfilePaymentMethods'>
            <h1 className="ProfilePaymentMethods-h1">Tu cartera en Rippio</h1>
            <div className='ProfilePaymentMethods-form-container'>
                {forms.map((form, index) => ( // Arreglo de formularios
                    <div className='' key={index}>
                        <button className='ProfilePaymentMethods-active' onClick={() => handleToggle(index)}>Método de Pago
                                        {form.arrow ?
                                            <img src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FupArrow.png?alt=media&token=4014049e-5578-4b03-be3f-f36cdbf35dd0' alt='arrow-up' className='information-buttonArrow' />
                                            :
                                            <img src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FdownArrow.png?alt=media&token=2eb9a78a-94b0-4c11-b2c0-41788a4f46cc' alt='arrow-down' className='information-buttonArrow' />}
                        </button>
                            <form id={`form-${index}`} className={`ProfilePaymentMethods-form ${form.isOpen ? 'open' : ''}`}>
                                <div className='div-banco'>
                                {!form.isSaved && <Select className='select selecbank' styles={customStyles} options={metodos_pago} placeholder='Selecciona tu banco'  isDisabled={form.isConfirmed} maxMenuHeight={115} onChange={option => handleSelectChange(index, option)} value={form.selectedOption}  />}
                                </div>
                                <div className={`ProfilePaymentMethods-form-card`} style={form.selectedOption ? optionStyles[form.selectedOption.value] : {}}>
                                    <div className='ProfilePaymentMethods-form-card-number'>
                                        <input className='ProfilePaymentMethods-Input' type="text" id="paymentmethod" name="paymentmethod" required
                                            placeholder='Número de tarjeta' readOnly={form.isConfirmed} value={cardNumbers[index] || ''} onChange={handleCardNumberChange(index)} maxLength="19" />
                                    </div>
                                    <div className='ProfilePaymentMethods-form-card-date'>
                                        <input className='ProfilePaymentMethods-Input' type="text" id="paymentmethod" name="paymentmethod" required
                                            placeholder='MM/AA' readOnly={form.isConfirmed}  value={expiryDates[index] || ''} onChange={handleExpiryDateChange(index)} maxLength="5"  />

                                        <input className='ProfilePaymentMethods-Input' type="number" id="paymentmethod" name="paymentmethod" required
                                            placeholder='CVV' readOnly={form.isConfirmed}  maxLength="3" />
                                    </div>
                                    <div className='ProfilePaymentMethods-form-card-name'>
                                        <input className='ProfilePaymentMethods-Input' type="text" id="paymentmethod" name="paymentmethod" required
                                            placeholder='Nombre' readOnly={form.isConfirmed}  />
                                    
                                        <input className='ProfilePaymentMethods-Input' type="text" id="paymentmethod" name="paymentmethod" required
                                            placeholder='Apellido' readOnly={form.isConfirmed}  />
                                    </div>
                                </div>
                                {!form.isSaved && <button type="button" className='ProfilePaymentMethods-Button-Confirm' onClick={() => handleConfirmClick(index)}>Guardar</button>}
                            </form>   
                    </div>
                ))}
            </div>
            <button type="button" className='ProfilePaymentMethods-Button' onClick={handleAddpaymentmethodClick}>Añadir una nueva tarjeta</button>
        </section>
    )
}