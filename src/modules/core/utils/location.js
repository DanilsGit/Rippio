import axios from 'axios'

// Función para obtener la ubicación del usuario y subirlo al localStorage
export const getLocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords
                try {
                    const res = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=es`)
                    const city = res.data.city
                    resolve({
                        location: {
                            city: city,
                            principalSubdivision: res.data.principalSubdivision
                        },
                        permission: true
                    })
                } catch (error) {
                    console.log(error);
                    reject(error);
                }
            })
        } else {
            console.log('No se pudo obtener la ubicación');
            reject('No se pudo obtener la ubicación');
        }
    });
}