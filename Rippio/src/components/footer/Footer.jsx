import './footer.css';
import { FooterInformation } from './FooterInformation';

export function Footer() {
    return (

        <footer className="footer">
            <FooterInformation />
            <section className="footer-basic">
                <img className='footer-img' src="/icons/rippioFoodHappyIcon.png" draggable='false'></img>
                <p className="footer-p">© 2024 Rippio. Todos los derechos reservados.</p>
            </section>
        </footer>
    )
}