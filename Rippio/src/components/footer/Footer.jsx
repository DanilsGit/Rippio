import './footer.css';
import { FooterInformation } from './FooterInformation';
import { useState } from "react";


export function Footer() {
    const [arrow, setArrow] = useState(false);



    const handleClick = () => {
        setArrow(!arrow);
        const footerInformationContent = document.querySelectorAll('.footer-information-content');
        footerInformationContent.forEach((item) => {
            if (item.classList.contains('footer-information-content-inactive')) {
                item.classList.replace('footer-information-content-inactive', 'footer-information-content-active');
                return;
            }
            if (item.classList.contains('footer-information-content-active')) {
                item.classList.replace('footer-information-content-active', 'footer-information-content-inactive');
                return;
            }
        });
    }

    return (
        <footer className="footer">

            <button onClick={handleClick} className='footer-information-button'>
                Más información
                {arrow ?
                    <img src='/icons/upArrow.png' alt='arrow-up' className='information-buttonArrow' />
                    :
                    <img src='/icons/downArrow.png' alt='arrow-down' className='information-buttonArrow' />}
            </button>
            <FooterInformation />
        </footer>
    )
}