import { Link } from 'react-router-dom'
import './teamSection.css'

export function TeamSection(){
    return(
        <section className="teamSection">
                <div className='team-background'>
                    <img draggable='false' className='team-background-img' src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/HomePage%2FTeamSection%2Fwooden-background.jpg?alt=media&token=6e28fe41-0b7a-44d8-ba0b-2002c1c9e320'></img>
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
                        <Link to={`/team`} className='teamBtn'>Conoce los requisitos</Link>
                    </section>

                    <section className='teamSection-item'>
                        <section className='teamSection-item-content'>
                        <h3 className='verticalText-2'>CRECIMIENTO Y PROMOCIÓN</h3>
                            <div className='img-container'>
                                <img draggable='false' className='teamIcon visibility' src='/principalPage/teamSection/visibilityIcon.png'></img>
                                <img draggable='false' className='teamImg' src='/principalPage/teamSection/visibility.png'></img>
                            </div>
                            <h2 className='team-title'>OBTEN VISIBILIDAD</h2>
                            <p>¡Sé parte de Rippio! Registra tu restaurante y consigue nuevos clientes de manera orgánica mediante nuestro sistema de reseñas.</p>
                        </section>
                        <Link to={`/login`} className='teamBtn' href='/team'>Acceder al registro</Link>
                    </section>
                </div>
            </section>
    )
}