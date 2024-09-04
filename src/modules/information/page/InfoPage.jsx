/* eslint-disable react/no-unescaped-entities */
// import { Link } from 'react-router-dom';
import HeaderNav  from '@m/core/components/headerNav/HeaderNav';
import { Footer } from '@m/core/components/footer/Footer';
import { useEffect } from 'react';
import './infoPage.css'


export function InfoPage() {


    useEffect(() => {
        window.scrollTo(0,0)
    },[])

    return (
        <div className='background-container'>
            <HeaderNav />
            <div className='info-container'>
                <div className='info-container-video'>
                    <video  autoPlay loop muted>
                        <source src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/InfoPage%2F1475378_People_Family_Food_1920x1080.mp4?alt=media&token=99d65f37-4451-4057-ad92-a8b6c9db2f9a' type='video/mp4' />
                    </video>
                </div>
                <div className='info-container-title'>
                    <h1 className='info-container-title-h1' id="about-us">Conoce Rippio Food</h1>
                    <p className='info-container-title-p'>Una aplicación innovadora para realizar pedidos de comida que tiene como objetivo
                            principal conectar a los consumidores con sus restaurantes favoritos de manera rápida, segura y transparente. </p>
                    
                </div>
                <div className='info-container-mision'>
                    <h2 className='info-container-mision-h2'>¿Cuál es nuestra Misión?</h2>
                    <p className='info-container-mision-p'>Nuestra aplicación fue creada en 2024 en la vibrante ciudad de Tuluá, con la misión de
                                transformar la experiencia gastronómica y brindar beneficios tanto a los usuarios como a los establecimientos culinarios.En Rippio Food, nos comprometemos a ofrecer una plataforma confiable y eficiente que mejore la vida de nuestros usuarios y apoye el crecimiento de los restaurantes
                            locales. Creemos en la transparencia como un pilar fundamental, y trabajamos arduamente para proteger los intereses de nuestros consumidores y socios comerciales.</p>

                    <h2 className='info-container-mision-h2'>Transparencia y confianza</h2>
                    <p className='info-container-mision-p'>Para nosotros, la transparencia es clave. Nos aseguramos de que cada pedido realizado a través de nuestra plataforma sea claro y sin sorpresas. Proporcionamos información
                            detallada sobre los tiempos de entrega, precios y descripciones de los productos, para que nuestros usuarios puedan tomar decisiones informadas. Además, mantenemos una comunicación abierta y constante con los restaurantes para garantizar que se cumplan los más altos estándares de calidad y servicio.</p>

                    <h2 className='info-container-mision-h2'>Seguridad para todos</h2>
                    <p className='info-container-mision-p'>La seguridad de nuestros usuarios y socios es nuestra prioridad. Implementamos medidas de seguridad avanzadas para proteger los datos personales y las transacciones realizadas en nuestra plataforma. Nos esforzamos por crear un ambiente seguro y confiable donde tanto
                            consumidores como restaurantes puedan interactuar sin preocupaciones.</p>
                    <h2 className='info-container-mision-h2'>Apoyo a los restaurantes locales</h2>
                    <p className='info-container-mision-p'>En Rippio Food, valoramos enormemente a los restaurantes locales que son el corazón de nuestras comunidades. Nos dedicamos a apoyar su crecimiento y éxito brindándoles una plataforma donde puedan alcanzar a más clientes y expandir su presencia en el mercado.
                            Creemos que una relación justa y beneficiosa para todos es la base de una comunidad próspera.</p>

                    <h2 className='info-container-mision-h2'>Únete a nosotros</h2>
                    <p className='info-container-mision-p'>Te invitamos a descargar la aplicación de Rippio Food y descubrir una nueva forma de disfrutar tus comidas favoritas. Ya sea que estés buscando probar algo nuevo o simplemente ordenar de tu restaurante de siempre, estamos aquí para servirte con transparencia, seguridad y confianza.
                            Gracias por elegir Rippio Food. ¡Buen provecho!</p>
                </div>
                
            </div>

            <div className='help-container'>
                <div className='help-container-questions'>
                    <h2 className='help-container-title' id="help-center">Centro de Ayuda</h2>
                    <p className='help-container-p'>En Rippio Food, nuestra prioridad es ofrecerte la mejor experiencia posible al utilizar nuestra aplicación. Sabemos que en ocasiones pueden surgir preguntas o inconvenientes, y estamos aquí para ayudarte de manera rápida y efectiva.
                            Nuestro Centro de Ayuda ha sido diseñado para proporcionarte respuestas claras y soluciones a las consultas más comunes, facilitando tu navegación y uso de nuestra plataforma. Ya sea que necesites asistencia con tu cuenta, con un pedido, o simplemente tengas una pregunta general,
                            estás en el lugar correcto.</p>

                    <h2 className='help-container-h2' id="questions">Preguntas Frecuentes</h2>
                    <ul>
                        <li className='help-container-li'>¿Cómo puedo añadir créditos a mi cuenta?
                                <p>Puedes añadir créditos a tu cuenta de Rippio Food a través de nuestra aplicación o sitio web. Simplemente ve a la sección de "Créditos" en tu perfil y selecciona el método de pago de tu preferencia.</p>
                            </li>
                            <li className='help-container-li'>¿Cómo realizo un pedido?
                                <p>Realizar un pedido en Rippio Food es muy sencillo. Navega por los menús de tus restaurantes favoritos, selecciona los productos que deseas y agrégalos al carrito. Luego, sigue los pasos de pago y confirma tu pedido.</p>
                            </li>
                            <li className='help-container-li'>¿Puedo cancelar o modificar mi pedido?
                                <p>Sí, puedes cancelar o modificar tu pedido dentro de los primeros 5 minutos después de haberlo realizado. Pasado este tiempo, deberás contactar a nuestro soporte para evaluar las opciones disponibles.</p>
                            </li>
                        </ul>
                </div>

                <div className='help-container-devolutions'>
                    <h2 className='help-container-h2' id="changes-devolutions">Política de Cambios y Devoluciones</h2>
                    <ul>
                        <li className='help-container-li'>¿Qué es nuestra política de cambios y devoluciones?
                            <p>En Rippio Food, nos comprometemos a ofrecerte productos frescos y de alta calidad. Si no estás satisfecho con tu pedido, tienes hasta 24 horas para solicitar una devolución o cambio. Asegúrate de proporcionar detalles específicos sobre el problema para que podamos procesar tu solicitud adecuadamente.</p>
                        </li>
                        <li className='help-container-li'>¿Cómo puedo solicitar una devolución?
                            <p>Para solicitar una devolución, sigue estos pasos:  </p>
                            <ol>
                                <li className='help-container-li-li'>Ve a la sección "Mis Pedidos" en tu cuenta.</li>
                                <li className='help-container-li-li'>Selecciona el pedido que deseas devolver.</li>
                                <li className='help-container-li-li'>Haz clic en "Solicitar Devolución" y sigue las instrucciones proporcionadas.</li>
                                <li className='help-container-li-li'>Nuestro equipo de soporte se pondrá en contacto contigo para confirmar los detalles y procesar tu solicitud.</li>
                            </ol>
                        </li>
                    </ul>

                    <h2 className='help-container-h2' id="warranty-request">Solicitud de Garantía</h2>
                    <ul className='help-container-ul'>
                        <li className='help-container-li'>
                                ¿Qué cubre nuestra garantía?
                            <p>La garantía de Rippio Food cubre la calidad y frescura de los alimentos entregados. Si recibes un producto que no cumple con nuestros estándares de calidad, puedes solicitar una compensación o reemplazo.</p>
                        </li>
                        <li className='help-container-li'>¿Cómo solicitar una garantía?
                            <p>Para solicitar una garantía, sigue estos pasos:</p>
                            <ol>
                                <li className='help-container-li-li'>Ve a la sección "Mis Pedidos" en tu cuenta.</li>
                                <li className='help-container-li-li'>Selecciona el pedido en cuestión.</li>
                                <li className='help-container-li-li'>Haz clic en "Solicitar Garantía" y completa el formulario con los detalles del problema.</li>
                                <li className='help-container-li-li'>Adjunta fotos si es necesario para ayudar a nuestro equipo a evaluar la situación.</li>
                                <li className='help-container-li-li'>Nuestro equipo de soporte revisará tu solicitud y se pondrá en contacto contigo para resolver el problema.</li>
                            </ol>

                        </li>
                    </ul>

                    <h2 className='help-container-h2' id="manage-order">¿Cómo Gestionar mi Pedido?</h2>
                    <ul>
                        <li className='help-container-li'>¿Cómo agregar observaciones a mi pedido?
                            <p>Durante el proceso de pago, encontrarás una sección para agregar observaciones especiales a tu pedido. Aquí puedes especificar cualquier requerimiento adicional, como alergias, preferencias de cocción, o instrucciones de entrega.</p>
                        </li>
                        <li className='help-container-li'>¿Puedo agregar extras o adiciones a mi pedido?
                            <p>Sí, puedes agregar extras o adiciones a tu pedido desde el menú del restaurante. Selecciona los productos adicionales que deseas y añádelos a tu carrito antes de proceder al pago.</p>
                        </li>
                        <li className='help-container-li'>¿Qué debo hacer si olvidé incluir una observación o extra?
                            <p>Si olvidaste incluir una observación o extra, puedes contactar al restaurante directamente a través de la opción de "Chat" en la aplicación, disponible durante los primeros minutos después de realizar tu pedido.</p>
                        </li>

                    </ul>
                </div>
                <div className='help-container-contact'>
                    <h2 className='help-container-contact-h2' id="contact">Contáctanos</h2>
                    <p className='help-container-contact-p'>Si tienes algún comentario o inquietud, no dudes en ponerte en contacto con nuestro equipo de soporte. Estamos aquí para ayudarte y brindarte la asistencia que necesitas para disfrutar al máximo de tu experiencia en Rippio Food.</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}