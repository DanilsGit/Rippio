import "./falseStateMessage.css"

export default function FalseStateMessage() {
    return (
        <div className="FalseStateMessage_container">
            <h1 className="FalseStateMessage_container_title">Su restaurante <span>no</span> está verificado</h1>
            <p className="FalseStateMessage_container_content">Nuestro equipo está trabajando para verificar tu ingreso y darte a conocer</p>
            <p className="FalseStateMessage_container_content">Mientras esperas, te recomendamos agregar información al perfil, menús y horarios de atención</p>
        </div>
    )
}