/* eslint-disable react/prop-types */
import { useState } from 'react'
import './buyPlanModal.css'
import Modal from 'react-modal'
import Select from 'react-select'
import { buyPlan } from '../../../api/plan'
import { useAuth } from '../../../hooks/useAuth'

export function BuyPlanModal({ plan, isOpen, closeModal, pay_method, getPlan }) {

    const [selectedMethod, setSelectedMethod] = useState(null)
    const [isSelectOpen, setIsSelectOpen] = useState(false)
    const [loadingBuy, setLoadingBuy] = useState(false)
    const [onceSubmitted, setOnceSubmitted] = useState(false)
    //Token de zustand
    const token = useAuth(state => state.token)

    //Función para enviar la compra
    const handleSubmit = async (e, id) => {
        e.preventDefault()
        if (onceSubmitted) return
        setLoadingBuy(true)
        setOnceSubmitted(true)

        try {
            await buyPlan(token, { id_plan: id, metodo_pago: selectedMethod.value })
            await getPlan(token)
            setLoadingBuy(false)
            closeModal()
        } catch (error) {
            console.log(error);
            setLoadingBuy(false)
            setOnceSubmitted(false)
        }
    }

    const visible = {
        content: {
            overflow: 'visible'
        }
    }

    const auto = {
        content: {
            overflow: 'auto'
        }
    }

    if (!plan) return null

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                className='buyPlanModal Modal'
                style={
                    isSelectOpen ? visible : auto
                }
            >
                <form className='buyPlanModal-container'
                    onSubmit={
                        (e) => handleSubmit(e, plan.id)
                    }
                >
                    <div className='buyPlanModal-infoContainer-text'>
                        <h2>Estás a punto de obtener el {plan.nombre}</h2>
                        <ul>
                            {
                                plan.descripcion.map((feature, index) => {
                                    return <li key={index}>{feature}</li>
                                })
                            }
                        </ul>
                        <p>{plan.precio}COP/mes</p>
                        <Select
                            onMenuOpen={() => setIsSelectOpen(true)}
                            onMenuClose={() => setIsSelectOpen(false)}
                            maxMenuHeight={70}
                            className='buyPlanModal-select'
                            options={pay_method}
                            noOptionsMessage={() => 'Agrega métodos de pago en el perfil'}
                            placeholder='Método de pago'
                            onChange={(selected) => setSelectedMethod(selected)}
                            isSearchable={false}
                            required
                        />
                    </div>
                    <div className='buyPlanModal-buyContainer'>
                        <div>
                            <img
                                alt='plan_icon'
                                draggable='false'
                                src={
                                    plan.id === 1 ? 'https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FbasicPlanRippioIcon.png?alt=media&token=15d45e3e-3959-4f5d-9c3c-e9e470734a94'
                                        : plan.id === 2 ? 'https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FplusPlanRippioIcon.png?alt=media&token=03b83152-b50e-4a59-9580-60d6077608a3'
                                            : 'https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FpremiumPlanRippioIcon.png?alt=media&token=ffa61936-be50-4db6-a236-74687c12514a'
                                }
                            />
                        </div>
                        <button className='buyPlanModal-buyButton'>
                            {
                                loadingBuy ? 'Cargando...' : 'Comprar'
                            }
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}