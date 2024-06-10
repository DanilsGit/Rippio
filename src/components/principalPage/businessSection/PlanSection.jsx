import './planSection.css'
import { getPlans } from '../../../api/plan'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { BuyPlanModal } from '../../Modals/buyPlanModal/BuyPlanModal'

export function PlanSection() {

    //Estado para almacenar los planes
    const [plans, setPlans] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    //UseEffect para traer los planes
    useEffect(() => {
        getPlans()
            .then(res => {
                // res.data.descripcion es un string con los features separados por coma
                res.data.forEach(plan => {
                    plan.descripcion = plan.descripcion.split(',');
                });
                //Ahora res.data es un array de objetos con los features separados
                setPlans(res.data);
            }).catch(err => {
                console.log(err);
            })
    }, [])

    //Función para abrir modal de plan
    const handlePlanModal = (plan) => {
        setSelectedPlan(plan);
        setIsModalOpen(true);
    }

    return (
        <section className='planSection'>
            <div className='plan-background'>
                <img draggable='false' className='plan-background-img' src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/HomePage%2FPlanSection%2FWavyBackground.png?alt=media&token=8cccb115-4a7e-454a-9d20-03bbe93518bf'></img>
            </div>
            <section className='businessSection-plans-content'>
                {
                    !plans ? <p>Cargando...</p> :
                    plans.map((plan) => {
                        return (
                            <section key={plan.id} className='businessSection-plan-item'>
                                <header className='plan-header'>
                                    <div className='plan-icon-container'>
                                        <img className='planIcon' draggable='false'
                                        src={
                                            plan.id === 1 ? 'https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FbasicPlanRippioIcon.png?alt=media&token=15d45e3e-3959-4f5d-9c3c-e9e470734a94'
                                            : plan.id === 2 ? 'https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FplusPlanRippioIcon.png?alt=media&token=03b83152-b50e-4a59-9580-60d6077608a3'
                                            : 'https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FpremiumPlanRippioIcon.png?alt=media&token=ffa61936-be50-4db6-a236-74687c12514a'
                                        }
                                        
                                        />
                                        <p className='iconText'>Rippio {plan.nombre}</p>
                                    </div>
                                    <h2 className='plan-title'>{plan.nombre}</h2>
                                    <p className='planPrice'>{plan.precio} COP al mes</p>
                                </header>
                                <ul className='plan-ul'>
                                    {   plan.descripcion &&
                                        plan.descripcion.map((feature, index) => {
                                            return (
                                                <li key={index}
                                                className='plan-ul-li'>{feature}</li>
                                            )
                                        })
                                    }
                                </ul>
                                <button onClick={() => handlePlanModal(plan)} className='planBtn' href='#'>Conseguir plan</button>
                                <Link to='/info' className='terminosBtn' href='#'>Términos y condiciones</Link>
                            </section>
                        )
                    })
                }
            </section>
            <BuyPlanModal plan={selectedPlan} isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
        </section>
    )
}