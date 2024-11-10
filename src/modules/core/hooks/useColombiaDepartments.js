import axios from 'axios'
import { useEffect, useState } from 'react';

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