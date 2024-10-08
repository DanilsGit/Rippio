import { useEffect, useState } from 'react'
import { getOrders } from '@/api/order'
import { useAuth } from '@m/core/hooks/useAuth'
import { formatDate } from '@m/core/utils/formatDate'
import { addAddress, deleteAddress, editAddress, getAddresses } from '../../../api/address'
import axios from 'axios'

export const useOrders = () => {
    //Obtenemos el token del usuario en zustand
    const token = useAuth(state => state.token)

    //Estado para guardar los pedidos
    const [orders, setOrders] = useState([])

    //Estado loading para mostrar un Cargando... mientras se cargan los pedidos
    const [loading, setLoading] = useState(true)



    //UseEffect para obtener los pedidos del usuario
    useEffect(() => {
        getOrders(token).then(response => {
            response.data.forEach(order => {
                let cantidad = 0;
                order.productos.forEach(product => {
                    product.Observaciones = product.Observaciones == 'N/A' || product.Observaciones == '' || !product.Observaciones ? '' : product.Observaciones
                    cantidad += product.cantidad
                })
                order.fecha = formatDate(order.fecha)
                order.cantidadProductos = cantidad
            })

            setOrders(response.data)
            setLoading(false)
        }).catch(error => {
            console.log(error)
            setLoading(false)
        })
    }, [token])

    return { orders, loading }

}

export const useColombiaDepartments = () => {
    const [departamentos, setDepartamentos] = useState([])

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

    return { departamentos };
}

export const useManageAddress = () => {
    const token = useAuth((state) => state.token)

    // Estado para añadir una nueva dirección
    const [forms, setForms] = useState([]);

    // Estado de carga de las direcciones
    const [loadingForm, setLoadingForm] = useState(true);

    // Estado de carga de la dirección
    const [loadingAddress, setLoadingAddress] = useState(false);

    // Estado para manejar las ciudades
    const [ciudades, setCiudades] = useState([])

    // Función para abrir y cerrar el formulario
    function handleToggle(id) {
        const miDiv = document.querySelector(`#form-${id}`);
        miDiv.classList.toggle('open');
        // Hacer que los campos no sean editables
        const newForms = forms.map((form) => {
            if (form.id === id) {
                return { ...form, isOpen: !form.isOpen, arrow: !form.arrow };
            } else {
                return { ...form, isOpen: false, arrow: false };
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
            const newAddress = {
                ...address,
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
        console.log(address);
        setLoadingAddress(true);
        try {
            await editAddress(token, address);
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
                id_direccion: address.id,
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
            } else {
                await deleteAddress(token, id);
                const newForms = forms.filter((form) => form.id !== id);
                setForms(newForms);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDepartamentChange = (selectedOption, form) => {
        const newCiudades = selectedOption.ciudades.map((ciudad, index) => ({ value: index, label: ciudad }));
        setCiudades(newCiudades);

        const newForms = forms.map((f) =>
            f.id === form.id ? { ...f, departamento: selectedOption } : f
        );
        setForms(newForms);
    }

    const handleSetForms = (newForms) => {
        setForms(newForms);
    }

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

    return { handleSetForms, forms, loadingForm, loadingAddress, handleToggle, handleConfirmClick, handleAddAddressClick, handleDeleteClick, handleDepartamentChange, ciudades, handleEditClick };
}
