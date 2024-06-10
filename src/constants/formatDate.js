export const formatDate = (date) => {
        //fecha UTC
        const fecha = date

        //fecha UTC a milisegundos
        const fechaMilisegundos = Date.parse(fecha)

        //Formatear fecha co a JUN 9, 2024 1:09 PM
        const fechaCO = new Date(fechaMilisegundos).toLocaleString('en-US', { timeZone: 'America/Bogota', month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })

    return fechaCO
}