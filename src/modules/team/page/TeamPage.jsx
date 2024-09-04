import HeaderNav from '@m/core/components/headerNav/HeaderNav';
import { Footer } from '@m/core/components/footer/Footer';
import { useEffect } from 'react';
import './teamPage.css'


export function TeamPage() {


    useEffect(() => {
        window.scrollTo(0,0)
    },[])

    return (
        <div className='team-background-container'>
            <HeaderNav />
            <div className='team-container'>
                <div className='team-container-title'>
                    <h1>La Familia Rippio</h1>
                    <h2>Un lugar que protege tu seguridad, derechos laborales y tiene las mejores tarifas del mercado actual</h2>
                    <p>¡Felicidades! ya llegaste aquí.</p>
                    <img src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/TeamPage%2FUserAvatar.png?alt=media&token=c172fb21-6975-4ac1-a5de-d1b4cfbf4cce'/>
                </div>
                <div className='team-container-subtitle'>
                    <h2>Algunos de los beneficios que podrás obtener si te unes al Team Rippio</h2>
                    <p>Todos los beneficios están supuestos a cambios y siguen las regulaciones requeridas por las directrices del país. </p>
                </div>
                <div className='team-container-grid'>
                    <div>
                        <img src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/TeamPage%2FSalaryIcon.png?alt=media&token=e37cc5a2-04cf-49d0-97cc-0781047173e9' />
                        <h3>Salario competitivo</h3>
                        <p>Obtén un salario competitivo que te permita vivir cómodamente y disfrutar de la vida. En Rippio Food, valoramos tu esfuerzo 
                            y dedicación, por lo que ofrecemos una remuneración justa y atractiva, acorde con el mercado.</p>
                    </div>
                    <div>
                        <img src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/TeamPage%2FSafeIcon.png?alt=media&token=dd4be19d-141e-423e-aeba-e9938650dc5e' />
                        <h3>Seguro de salud</h3>
                        <p>Al cumplir cierto periodo de prueba, obtendrás un seguro de salud que te proteja contra posibles accidentes o asaltos. 
                            Tu bienestar es nuestra prioridad, y queremos asegurarnos de que estés cubierto ante cualquier eventualidad. 
                            </p>
                    </div>
                    <div>
                        <img src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/TeamPage%2FScheduleIcon.png?alt=media&token=c21c33c7-9f35-4aa3-87ad-f3d21b672706' />
                        <h3>Horario flexible</h3>
                        <p>Trabaja en tus propios términos y horarios. En Rippio Food, entendemos que cada persona tiene diferentes necesidades 
                            y responsabilidades. Por eso, ofrecemos la flexibilidad de elegir tus horarios de trabajo.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}