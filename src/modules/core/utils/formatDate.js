export const formatDate = (date) => {
    //fecha UTC
    const fecha = date

    //fecha UTC a milisegundos
    const fechaMilisegundos = Date.parse(fecha)

    //Formatear fecha co a JUN 9, 2024 1:09 PM
    const fechaCO = new Date(fechaMilisegundos).toLocaleString('en-US', { timeZone: 'America/Bogota', month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })

    return fechaCO
}

// La fecha en formatDate(fecha) retorna en el formato Jun 10, 2024, 10:20 PM
// Se debe formatear a Jun 10, 2024 para comparar con la fecha actual sin la hora
export const formatDateWithoutHour = (date) => {
    // Ya viene con el formato Jun 10, 2024, 10:20 PM
    const fecha = date
    const fechaArray = fecha.split(',')
    const fechaWithoutHour = fechaArray[0] + fechaArray[1]
    return fechaWithoutHour
}