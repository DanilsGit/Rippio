import axios from 'axios'

// Función para obtener la ubicación del usuario y subirlo al localStorage
export const getLocation = async () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords
            axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=es`)
                .then(res => {
                    const city = res.data.city
                    if (city === null || city === undefined) {
                        window.localStorage.setItem('location', JSON.stringify({
                            city: 'Tuluá',
                            principalSubdivision: res.data.principalSubdivision
                        }))
                    } else {
                        window.localStorage.setItem('location', JSON.stringify({
                            city: city,
                            principalSubdivision: res.data.principalSubdivision
                        }))
                    }
                    window.localStorage.setItem('permission', JSON.stringify(true))
                }).catch(err => {
                    console.log(err);
                })
        })
    } else {
        console.log('No se pudo obtener la ubicación');
    }
}