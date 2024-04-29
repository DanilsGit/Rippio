import highlight from '/principalPage/highlight/highlight01.png';
import './highlight.css'

export function Highlight(){
    return (
        <section className="Highlight firstSection-child">
        <h2> Destacado en tu <span>Zona</span></h2>
        <div className="Highlight-imgContainer">
            <img draggable='false' src={highlight} alt="Highlight" />
        </div>
    </section>
    )
}