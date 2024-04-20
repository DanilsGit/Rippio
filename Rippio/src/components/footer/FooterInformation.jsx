import { useState } from "react";

export function FooterInformation() {
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
        <section className='footer-information'>
        <button onClick={handleClick} className='footer-information-button'>
        Más información
        {arrow ?
        <img src='/icons/upArrow.png' alt='arrow-up' className='information-buttonArrow' />
        :
        <img src='/icons/downArrow.png' alt='arrow-down' className='information-buttonArrow' />}
        </button>

        <section className='footer-information-item'>
            <div className='information-title-container'><h2 className='footer-information-title'>Contáctanos</h2></div>
            <section className='footer-information-content footer-information-content-inactive'>
                <div className='content-item'>
                    <p>Servicio al cliente Whatsapp</p>
                    <p>(+57) 300 123 4567</p>
                </div>
                <div className='content-item'>
                    <p>Línea de servicio a nivel nacional</p>
                    <p>01 8000 123 456</p>
                </div>
                <div className='content-item'>
                    <p>Oficina Tuluá</p>
                    <p>(+57) 300 123 4567</p>
                </div>
                <div className='content-item'>
                    <p>Oficina Buga</p>
                    <p>(+57) 300 123 4567</p>
                </div>
                <div className='content-item'>
                    <p>Línea de ventas</p>
                    <p>(+57) 300 123 4567</p>
                </div>
            </section>
        </section>

        <section className='footer-information-item'>
            <div className='information-title-container'><h2 className='footer-information-title'>Centro de ayudas</h2></div>
            <section className='footer-information-content footer-information-content-inactive'>
                <div className='content-item'>
                    <p>Servicio al cliente Whatsapp</p>
                    <p>(+57) 300 123 4567</p>
                </div>
                <div className='content-item'>
                    <p>Línea de servicio a nivel nacional</p>
                    <p>01 8000 123 456</p>
                </div>
                <div className='content-item'>
                    <p>Oficina Tuluá</p>
                    <p>(+57) 300 123 4567</p>
                </div>
                <div className='content-item'>
                    <p>Oficina Buga</p>
                    <p>(+57) 300 123 4567</p>
                </div>
                <div className='content-item'>
                    <p>Línea de ventas</p>
                    <p>(+57) 300 123 4567</p>
                </div>
            </section>
        </section>

        <section className='footer-information-item'>
            <div className='information-title-container'><h2 className='footer-information-title'>Información legal</h2></div>
            <section className='footer-information-content footer-information-content-inactive'>
                <div className='content-item'>
                    <p>Servicio al cliente Whatsapp</p>
                    <p>(+57) 300 123 4567</p>
                </div>
                <div className='content-item'>
                    <p>Línea de servicio a nivel nacional</p>
                    <p>01 8000 123 456</p>
                </div>
                <div className='content-item'>
                    <p>Oficina Tuluá</p>
                    <p>(+57) 300 123 4567</p>
                </div>
                <div className='content-item'>
                    <p>Oficina Buga</p>
                    <p>(+57) 300 123 4567</p>
                </div>
                <div className='content-item'>
                    <p>Línea de ventas</p>
                    <p>(+57) 300 123 4567</p>
                </div>
            </section>
        </section>

    </section>
    )
}