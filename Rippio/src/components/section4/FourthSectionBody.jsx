import '../../css/fourthSectionBody.css'

export function FourthSectionBody() {
    return (
        <section className="businessSection">
            <h2 className='businessSection-title'>Únete a <span>RIPPIO</span></h2>
            <section className="waveSection">
                <div className='waveAbsolute'>
                </div>
                <div className='businessSection-content'>
                
                    <section className='businessSection-item'>
                        <section className='businessSection-item-content'>
                            <div className='img-container'>
                                <img draggable='false' className='teamIcon' src='/section4/teamIcon.png'></img>
                                <img draggable='false' className='businessImg' src='/section4/team.png'></img>
                            </div>
                            <h2 className='team-title'>SE PARTE DEL EQUIPO</h2>
                            <p>¡Eres importante para nosotros! Te ofrecemos las mejores tarifas entre la competencia por entregar nuestros productos.</p>
                        </section>
                        <a className='businessBtn' href='#'>Conoce los requisitos</a>
                    </section>

                    <section className='businessSection-item'>
                        <section className='businessSection-item-content'>
                            <div className='img-container'>
                                <img draggable='false' className='teamIcon' src='/section4/visibilityIcon.png'></img>
                                <img draggable='false' className='businessImg' src='/section4/visibility.png'></img>
                            </div>
                            <h2 className='team-title'>CONSIGUE VISIBILIDAD</h2>
                            <p>Registra tu restaurante y consigue nuevos clientes de manera orgánica mediante nuestro sistema de reseñas.</p>
                        </section>
                        <a className='businessBtn' href='#'>Conoce los requisitos</a>
                    </section>
                </div>
            </section>
        </section>
    )
}