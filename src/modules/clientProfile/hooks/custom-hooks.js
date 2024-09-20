import { useEffect, useState } from 'react'
import { getOrders } from '@/api/order'
import { useAuth } from '@m/core/hooks/useAuth'
import { formatDate } from '@m/core/utils/formatDate'

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
            console.log(response.data);
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