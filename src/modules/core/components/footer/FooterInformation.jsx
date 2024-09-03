import { HashLink as Link } from 'react-router-hash-link';

export function FooterInformation(){
    return (
        <>
            <section className='footer-information'>
                <section className='footer-information-item'>
                    <div className='information-title-container'><h2 className='footer-information-title'>Líneas de contacto</h2></div>
                    <section className='footer-information-content footer-information-content-inactive'>
                        <div className='content-item'>
                            <a href="#">Servicio al cliente Whatsapp</a>
                            <p>(+ 57) 300 864 5795</p>
                        </div>
                        <div className='content-item'>
                            <a href="#">Línea de servicio a nivel nacional</a>
                            <p>01 8000 123 456</p>
                        </div>
                        <div className='content-item'>
                            <a href="#">Oficina Tuluá</a>
                            <p>(+ 57) 320 692 9719</p>
                        </div>
                        <div className='content-item'>
                            <a href="#">Línea de ventas</a>
                            <p>(+ 57) 318 705 8722</p>
                        </div>
                    </section>
                </section>

                <section className='footer-information-item'>
                    <div className='information-title-container'><h2 className='footer-information-title'><a  href="/info">Accede al centro de ayuda</a></h2></div>
                    <section className='footer-information-content footer-information-content-inactive'>
                        <div className='content-item'>
                        <Link smooth to="/info#questions">Preguntas Frecuentes</Link>
                            <p>Créditos, compras, pedidos</p>
                        </div>
                        <div className='content-item'>
                            <Link smooth to="/info#changes-devolutions">Política de cambios y devoluciones</Link>
                            <p>Para solicitar devoluciones</p>
                        </div>
                        <div className='content-item'>
                            <Link smooth to="/info#warranty-request">Solicitud de Garantía</Link>
                            <p>Protegemos tu pedido</p>
                        </div>
                        <div className='content-item'>
                            <Link smooth to="/info#manage-order">¿Cómo gestionar mi pedido?</Link>
                            <p>Observaciones, adiciones y extras</p>
                        </div>
                    </section>
                </section>

                <section className='footer-information-item'>
                    <div className='information-title-container'><h2 className='footer-information-title'>Acerca de información legal</h2></div>
                    <section className='footer-information-content footer-information-content-inactive'>
                        <div className='content-item'>
                            <a href="/info">Términos y condiciones</a>
                            <p>Para clientes frecuentes</p>
                        </div>
                        <div className='content-item'>
                            <a href="/info">Políticas de privacidad</a>
                            <p>Rippio cuida tu información</p>
                        </div>
                        <div className='content-item'>
                            <a href="/info">Tratamiento de datos</a>
                            <p>¿Qué datos recopilamos?</p>
                        </div>
                        <div className='content-item'>
                            <a href="/info">Superintendencia de industria</a>
                            <p>Tener en cuenta al subir su negocio</p>
                        </div>

                    </section>
                </section>

            </section>
            <section className="footer-basic">
                <img className='footer-img' src="/icons/rippioFoodHappyIcon.png" draggable='false'></img>
                <p className="footer-p">© 2024 Rippio. Todos los derechos reservados</p>
            </section>
        </>
    )
}

