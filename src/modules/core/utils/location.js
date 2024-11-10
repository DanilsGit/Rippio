import axios from "axios";

export const getLocation = () => {
  const defaultLocation = {
    location: {
      city: "Tuluá",
      principalSubdivision: "Valle del Cauca",
    },
    permission: false,
  };

  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      console.log("Geolocalización no soportada");
      resolve(defaultLocation);
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await axios.get(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=es`
          );
          const city = res.data.city;
          resolve({
            location: {
              city: city,
              principalSubdivision: res.data.principalSubdivision,
            },
            permission: true,
          });
        } catch (error) {
          console.log("Error al obtener ubicación:", error);
          resolve(defaultLocation);
        }
      },
      (error) => {
        console.log("Error de permisos:", error);
        resolve(defaultLocation);
      }
    );
  });
};
