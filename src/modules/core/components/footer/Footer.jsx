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
                    <img src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FupArrow.png?alt=media&token=4014049e-5578-4b03-be3f-f36cdbf35dd0' alt='arrow-up' className='information-buttonArrow' />
                    :
                    <img src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FdownArrow.png?alt=media&token=2eb9a78a-94b0-4c11-b2c0-41788a4f46cc' alt='arrow-down' className='information-buttonArrow' />}
            </button>
            <FooterInformation />
        </footer>
    )
}