import Select from 'react-select'
import './restaurantProfileSchedule.css'
import { useEffect, useState } from 'react';
import { Switch } from '@mui/material';
import { useAuth } from '@m/core/hooks/useAuth';
import { getSchedule, addSchedule, updateSchedule } from '@/api/schedule';

export default function RestaurantProfileSchedule() {
    const token = useAuth((state) => state.token)


    const [isOpen, setIsOpen] = useState({
        Lunes: false,
        Martes: false,
        Miércoles: false,
        Jueves: false,
        Viernes: false,
        Sábado: false,
        Domingo: false
    })

    const [schedule, setSchedule] = useState({
        dias: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
        inicio: {
            Lunes: '00:00',
            Martes: '00:00',
            Miércoles: '00:00',
            Jueves: '00:00',
            Viernes: '00:00',
            Sábado: '00:00',
            Domingo: '00:00'
        },
        fin: {
            Lunes: '00:00',
            Martes: '00:00',
            Miércoles: '00:00',
            Jueves: '00:00',
            Viernes: '00:00',
            Sábado: '00:00',
            Domingo: '00:00'
        }
    })


const formatSchedule = (mySchedule) => {
    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    const formatSchedule = {
        ...schedule,
        dias: mySchedule.map(dia => dia.dia_semana),
        inicio: {},
        fin: {}
    };

    let isOpen = {};

    dias.forEach((dia, index) => {
        formatSchedule.inicio[dia] = mySchedule[index]?.hora_apertura.split(':').slice(0, 2).join(':');
        formatSchedule.fin[dia] = mySchedule[index]?.hora_cierre.split(':').slice(0, 2).join(':');
        isOpen[dia] = formatSchedule.inicio[dia] === '00:00' && formatSchedule.fin[dia] === '00:00' ? false : true;
    });

    setIsOpen(isOpen);
    setSchedule(formatSchedule);
}

    const customStyles = {
        menu: (provided) => ({
            ...provided,
            zIndex: 9999,
        }),
        control: base => ({
            ...base,
            height: '3.5em',
            minHeight: '3.5em',
        }),
    };

    const optionsHR = [
        { value: 0, label: '00:00' },
        { value: 1, label: '01:00' },
        { value: 2, label: '02:00' },
        { value: 3, label: '03:00' },
        { value: 4, label: '04:00' },
        { value: 5, label: '05:00' },
        { value: 6, label: '06:00' },
        { value: 7, label: '07:00' },
        { value: 8, label: '08:00' },
        { value: 9, label: '09:00' },
        { value: 10, label: '10:00' },
        { value: 11, label: '11:00' },
        { value: 12, label: '12:00' },
        { value: 13, label: '13:00' },
        { value: 14, label: '14:00' },
        { value: 15, label: '15:00' },
        { value: 16, label: '16:00' },
        { value: 17, label: '17:00' },
        { value: 18, label: '18:00' },
        { value: 19, label: '19:00' },
        { value: 20, label: '20:00' },
        { value: 21, label: '21:00' },
        { value: 22, label: '22:00' },
        { value: 23, label: '23:00' }
    ]

    const dias = [
        {
            id: 0,
            dia: 'Lunes'
        },
        {
            id: 1,
            dia: 'Martes'
        },
        {
            id: 2,
            dia: 'Miércoles'
        },
        {
            id: 3,
            dia: 'Jueves'
        },
        {
            id: 4,
            dia: 'Viernes'
        },
        {
            id: 5,
            dia: 'Sábado'
        },
        {
            id: 6,
            dia: 'Domingo'
        }
    ]

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [haveSchedule, setHaveSchedule] = useState(false)

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError(null)
            }, 5000)
        }
    }, [error])



    const getMySchedule = async (token) => {
        setLoading(true)
        try {
            const res = await getSchedule(token)
            if (res.data.length == 0) {
                setLoading(false)
                setHaveSchedule(false)
                return
            }
            const mySchedule = res.data
            formatSchedule(mySchedule)
            setHaveSchedule(true)
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }

    const addMySchedule = async (token, schedule) => {
        setLoading(true)
        try {
            await addSchedule(token, schedule)
            setError('Horario establecido correctamente')
        } catch (error) {
            console.log(error);
            setError('Error al establecer horario')
        }
        setLoading(false)
        setHaveSchedule(true)
    }

    const updateMySchedule = async (token, schedule) => {
        setLoading(true)
        try {
            const res = await updateSchedule(token, schedule)
            console.log(res);
            setError('Horario actualizado correctamente')
        } catch (error) {
            console.log(error);
            setError(error.response.data.error)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (token) {
            getMySchedule(token)
        }
        console.log('useEffect',haveSchedule);
    }, [token, haveSchedule], [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const scheduleData = {
            dias: schedule.dias,
            hora_inicio: schedule.dias.map(dia => schedule.inicio[dia]),
            hora_fin: schedule.dias.map(dia => schedule.fin[dia])
        }
        if (haveSchedule) {
            updateMySchedule(token, scheduleData)
            console.log('update');
        } else {
            addMySchedule(token, scheduleData)
            console.log('add');
        }
        setLoading(false)
    }

    return (
        <section className="restaurantProfileSchedule">
            <div>
                <h1>Horarios de atención</h1>
                {
                    error
                        ? <h3 className='restaurantProfileSchedule-msgError'>{error}</h3>
                        : <h3>Establece los horarios de atención de tu restaurante</h3>
                }
            </div>
            {
                loading
                    ? <p>Cargando horarios...</p>
                    :
                    <form className='restaurantProfileSchedule-form'
                        onSubmit={handleSubmit}
                    >
                        {
                            dias.map(dia => (
                                <div key={dia.id} className='restaurantProfileSchedule-form-daysContainer'>
                                    <label className='hidden-label' htmlFor="openingTime">Hora de apertura</label>
                                    <div className='form-daysContainer-TitlesSwitch'>
                                        <h2>{dia.dia}</h2>
                                        <Switch
                                            checked={isOpen[dia.dia]}
                                            onChange={() =>{
                                                const open = !isOpen[dia.dia]
                                                setIsOpen({ ...isOpen, [dia.dia]: open })
                                                if (!open) {
                                                    setSchedule({
                                                        ...schedule,
                                                        inicio: {
                                                            ...schedule.inicio,
                                                            [dia.dia]: '00:00'
                                                        },
                                                        fin: {
                                                            ...schedule.fin,
                                                            [dia.dia]: '00:00'
                                                        }
                                                    })
                                                }
                                            }}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    </div>
                                    {
                                        isOpen[dia.dia]
                                        &&
                                        <div>
                                            <Select
                                                id="openingTime"
                                                styles={customStyles}
                                                options={optionsHR}
                                                placeholder='Abre'
                                                defaultInputValue={schedule.inicio[dia.dia]}
                                                onChange={(e) => {
                                                    setSchedule({
                                                        ...schedule,
                                                        inicio: {
                                                            ...schedule.inicio,
                                                            [dia.dia]: e.label
                                                        }
                                                    })
                                                }}
                                            />
                                            :
                                            <label className='hidden-label' htmlFor="closingTime">Hora de cierre</label>
                                            <Select
                                                id="closingTime"
                                                styles={customStyles}
                                                options={optionsHR}
                                                defaultInputValue={schedule.fin[dia.dia]}
                                                onChange={(e) => {
                                                    setSchedule({
                                                        ...schedule,
                                                        fin: {
                                                            ...schedule.fin,
                                                            [dia.dia]: e.label
                                                        }
                                                    })
                                                }}
                                                placeholder='Cierra'
                                            />
                                        </div>
                                    }
                                </div>
                            ))
                        }
                        <div className='restaurantProfileSchedule-form-SubmitContainer'>
                            <button type='submit'>Establecer horario</button>
                        </div>
                    </form>
            }
        </section>
    )
}