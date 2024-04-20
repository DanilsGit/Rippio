import rippioPlanIcon from '/principalPage/planSection/rippioPlanIcon.png'
import '../../css/planSection.css'

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
                        <p className='planPrice'>16.500/mes</p>
                    </header>
                    <ul className='plan-ul'>
                        <li className='plan-ul-li'>Descuentos exclusivos en restaurantes</li>
                        <li className='plan-ul-li'>Cancela cuando quieras</li>
                        <li className='plan-ul-li'>7 envíos gratis al mes</li>
                        <li className='plan-ul-li'>Soporte prioritario</li>
                    </ul>
                    <a className='planBtn' href='#'>Conseguir plan básico</a>
                    <a className='terminosBtn' href='#'>Términos y condiciones</a>
                </section>
                <section className='businessSection-plan-item'>
                    <div className='plan-header'>
                        <div className='plan-icon-container'>
                            <img className='planIcon' draggable='false' src={rippioPlanIcon}></img>
                            <p className='iconText'>Rippio plan básico</p>
                        </div>
                        <h2 className='plan-title'>Plan Básico</h2>
                        <p className='planPrice'>16.500/mes</p>
                    </div>
                    <ul className='plan-ul'>
                        <li className='plan-ul-li'>Descuentos exclusivos en restaurantes</li>
                        <li className='plan-ul-li'>Cancela cuando quieras</li>
                        <li className='plan-ul-li'>7 envíos gratis al mes</li>
                        <li className='plan-ul-li'>Soporte prioritario</li>
                    </ul>
                    <a className='planBtn' href='#'>Conseguir plan básico</a>
                    <a className='terminosBtn' href='#'>Términos y condiciones</a>
                </section>
                <section className='businessSection-plan-item'>
                
                    <div className='plan-header'>
                        <div className='plan-icon-container'>
                            <img className='planIcon' draggable='false' src={rippioPlanIcon}></img>
                            <p className='iconText'>Rippio plan básico</p>
                        </div>
                        <h2 className='plan-title'>Plan Básico</h2>
                        <p className='planPrice'>16.500/mes</p>
                    </div>
                    <ul className='plan-ul'>
                        <li className='plan-ul-li'>Descuentos exclusivos en restaurantes</li>
                        <li className='plan-ul-li'>Cancela cuando quieras</li>
                        <li className='plan-ul-li'>7 envíos gratis al mes</li>
                        <li className='plan-ul-li'>Soporte prioritario</li>
                    </ul>
                    <a className='planBtn' href='#'>Conseguir plan básico</a>
                    <a className='terminosBtn' href='#'>Términos y condiciones</a>
                </section>
            </section>
        </section>
    )
}