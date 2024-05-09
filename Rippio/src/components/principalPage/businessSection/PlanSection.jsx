import rippioPlanIcon from '/principalPage/planSection/rippioPlanIcon.png'
import './planSection.css'

export function PlanSection() {
    return (
        <section className='planSection'>
            <div className='plan-background'>
                <img draggable='false' className='plan-background-img' src='/principalPage/planSection/background.png'></img>
            </div>
            <section className='businessSection-plans-content'>

                <section className='businessSection-plan-item'>
                    <header className='plan-header'>
                        <div className='plan-icon-container'>
                            <img className='planIcon' draggable='false' src={rippioPlanIcon}></img>
                            <p className='iconText'>Rippio plan básico</p>
                        </div>
                        <h2 className='plan-title'>Plan Básico</h2>
                        <p className='planPrice'>16.500 COP al mes</p>
                    </header>
                    <ul className='plan-ul'>
                        <li className='plan-ul-li'>Disfruta de 2 pedidos con envio gratis al mes</li>
                        <li className='plan-ul-li'>Descuentos exclusivos en restaurantes</li>
                        <li className='plan-ul-li'>Cancela cuando quieras</li>
                        <li className='plan-ul-li'>Soporte prioritario</li>
                    </ul>
                    <a className='planBtn' href='#'>Conseguir plan básico</a>
                    <a className='terminosBtn' href='#'>Términos y condiciones</a>
                </section>
                <section className='businessSection-plan-item'>
                    <div className='plan-header'>
                        <div className='plan-icon-container'>
                            <img className='planIcon' draggable='false' src={rippioPlanIcon}></img>
                            <p className='iconText'>Rippio plan plus</p>
                        </div>
                        <h2 className='plan-title'>Rippio Plus</h2>
                        <p className='planPrice'>24.900 COP al mes</p>
                    </div>
                    <ul className='plan-ul'>
                        <li className='plan-ul-li'>Disfruta de 5 pedidos con envío gratis al mes</li>
                        <li className='plan-ul-li'>Obtienes 2 pedidos ultra fast gratis a la semana</li>
                        <li className='plan-ul-li'>Cancela cuando quieras</li>
                        <li className='plan-ul-li'>Beneficios del plan básico</li>
                    </ul>
                    <a className='planBtn' href='#'>Conseguir plan plus</a>
                    <a className='terminosBtn' href='#'>Términos y condiciones</a>
                </section>
                <section className='businessSection-plan-item'>
                
                    <div className='plan-header'>
                        <div className='plan-icon-container'>
                            <img className='planIcon' draggable='false' src={rippioPlanIcon}></img>
                            <p className='iconText'>Rippio plan premium</p>
                        </div>
                        <h2 className='plan-title'>Rippio Premium</h2>
                        <p className='planPrice'>39.900 COP al mes</p>
                    </div>
                    <ul className='plan-ul'>
                        <li className='plan-ul-li'>Disfruta de 10 pedidos con envío gratis al mes</li>
                        <li className='plan-ul-li'>Obtienes 4 pedidos ultra fast gratis a la semana</li>
                        <li className='plan-ul-li'>Cancela cuando quieras</li>
                        <li className='plan-ul-li'>Beneficios del plan plus</li>
                    </ul>
                    <a className='planBtn' href='#'>Conseguir plan premium</a>
                    <a className='terminosBtn' href='#'>Términos y condiciones</a>
                </section>
            </section>
        </section>
    )
}