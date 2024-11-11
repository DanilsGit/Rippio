import { addPayment } from "@/api/payment";

export const addExamplePaymentMethod = async (token) => {
    // esta funcionalidad sólo está disponible hasta el 18 de noviembre de 2024
    const fecha = new Date();
    if (fecha > new Date('2024-11-18')) return;

    const data = {
        Id_tipoTarjeta: 2,
        nombre: 'Tarjeta de Prueba',
        apellido: 'Sin limite',
        numero_tarjeta: '4642477371811643',
        fecha_vencimiento: '12/25',
        cvv: '563'
    }
    await addPayment(token, data)
};
