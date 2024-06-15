/* eslint-disable react/prop-types */
import './myPlan.css'
import { cancelPlan } from '../../../api/plan'
import { useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'

export function MyPlan({ plan, setPlan}) {

    // Estado para el loading de cancelar plan
    const [loadingCancel, setLoadingCancel] = useState(false)
    // Estado para oprimir el botón de cancelar plan
    const [cancelOnce, setCancelOnce] = useState(false)
    // Token de zustand
    const token = useAuth(state => state.token)

    if (!plan) return null

    // Función para cancelar plan
    const handleCancelPlan = () => {
        if (!token) return
        if (cancelOnce) return
        setCancelOnce(true)
        setLoadingCancel(true)
        cancelPlan(token).then(() => {
            setLoadingCancel(false)
            setPlan(null)
        }).catch(err => {
            console.log(err);
            setLoadingCancel(false)
            setCancelOnce(false)
        })
    }

    return (
        <section className='myPlan'>
            <div className='myPlan-content'>
                <section className='myPlan-info'>
                    <header className='myPlan-info-header'>
                        <h2 className='myPlan-info-title'>Rippio {plan.nombre}</h2>
                        <p>Esperamos que disfrutes de tu plan</p>
                    </header>
                    <section className='myPlan-info-feature'>
                        <p className='myPlan-info-feature-text'>Aprovecha al máximo tu plan con las siguientes características:</p>
                        <ul className='myPlan-info-feature-list'>
                            {
                                plan.descripcion.map((feature, index) => {
                                    return (
                                        <li key={index} className='myPlan-info-item'>{feature}</li>
                                    )
                                })
                            }
                        </ul>
                    </section>
                    <footer className='myPlan-info-footer'>
                        <button
                        onClick={handleCancelPlan}
                        className='myPlan-info-button'>
                            {loadingCancel ? 'Cancelando...' : 'Cancelar plan'}
                        </button>
                    </footer>
                </section>

                <div className='myPlan-imgContainer'>
                    <img className='myPlan-img' draggable='false'
                        src={
                            plan.id_plan === 1 ? 'https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FbasicPlanRippioIcon.png?alt=media&token=15d45e3e-3959-4f5d-9c3c-e9e470734a94'
                                : plan.id_plan === 2 ? 'https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FplusPlanRippioIcon.png?alt=media&token=03b83152-b50e-4a59-9580-60d6077608a3'
                                    : 'https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FpremiumPlanRippioIcon.png?alt=media&token=ffa61936-be50-4db6-a236-74687c12514a'
                        }
                    />
                </div>

            </div>

        </section>

    )
}