/* eslint-disable react/prop-types */
import { useState } from 'react'
import './buyPlanModal.css'
import Modal from 'react-modal'
import Select from 'react-select'

export function BuyPlanModal({ plan, isOpen, closeModal }) {

    const [selectedMethod, setSelectedMethod] = useState(null)
    const [isSelectOpen, setIsSelectOpen] = useState(false)

    //Función para enviar la compra
    const handleClick = (e, id) => {
        e.preventDefault()
        console.log(id)
        console.log(selectedMethod)
    }

    //Tarjetas de crédito:
    const methods = [
        { value: 1, label: 'Tarjeta terminada en 1234' },
        { value: 2, label: 'Tarjeta terminada en 5678' },
        { value: 3, label: 'Tarjeta terminada en 9012' },
        { value: 4, label: 'Tarjeta terminada en 3456' },
        { value: 5, label: 'Tarjeta terminada en 7890' },
        { value: 6, label: 'Tarjeta terminada en 1234' },
        { value: 7, label: 'Tarjeta terminada en 5678' },
    ]

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
                <div className='buyPlanModal-container'
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
                            options={methods}
                            placeholder='Método de pago'
                            onChange={(selected) => setSelectedMethod(selected)}
                            isSearchable={false}
                            
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
                        <button className='buyPlanModal-buyButton'
                            onClick={(e) => handleClick(e, plan.id)}>Comprar</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}