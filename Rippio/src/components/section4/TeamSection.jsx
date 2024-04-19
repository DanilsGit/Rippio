import '../../css/teamSection.css'

export function TeamSection(){
    return(
        <section className="teamSection">
                <div className='team-background'>
                    <img draggable='false' className='team-background-img' src='/principalPage/teamSection/background.png'></img>
                </div>

                <div className='teamSection-content'>

                    <section className='teamSection-item'>
                        <section className='teamSection-item-content'>
                        <h3 className='verticalText-1'>SEGURIDAD E INTEGRIDAD</h3>
                            <div className='img-container'>
                                <img draggable='false' className='teamIcon' src='/principalPage/teamSection/teamIcon.png'></img>
                                <img draggable='false' className='teamImg' src='/principalPage/teamSection/team.png'></img>
                            </div>
                            <h2 className='team-title'>SE PARTE DEL EQUIPO</h2>
                            <p>¡Eres importante para nosotros! Te ofrecemos las mejores tarifas entre la competencia por entregar nuestros productos.</p>
                        </section>
                        <a className='teamBtn' href='#'>Conoce los requisitos</a>
                    </section>

                    <section className='teamSection-item'>
                        <section className='teamSection-item-content'>
                        <h3 className='verticalText-2'>CRECIMIENTO Y PROMOCIÓN</h3>
                            <div className='img-container'>
                                <img draggable='false' className='teamIcon' src='/principalPage/teamSection/visibilityIcon.png'></img>
                                <img draggable='false' className='teamImg' src='/principalPage/teamSection/visibility.png'></img>
                            </div>
                            <h2 className='team-title'>CONSIGUE VISIBILIDAD</h2>
                            <p>Registra tu restaurante y consigue nuevos clientes de manera orgánica mediante nuestro sistema de reseñas.</p>
                        </section>
                        <a className='teamBtn' href='#'>Acceder al equipo</a>
                    </section>
                </div>
            </section>
    )
}