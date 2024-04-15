import CarouselImage from "./CarouselImage";
import slides from '../../utilities/carrousel.json'
import { Categories } from "./Categories";
import '../../css/firstSectionBody.css';


export function FirstSectionBody() {
    return (
        <section className="MainContent-bodySection-firstSection">

            <CarouselImage slides={slides} />

            <Categories />
            
            <section className="Highlight firstSection-child">
                <h2> Destacado en tu <span>Zona</span></h2>
                <div className="Highlight-imgContainer">
                    <img draggable='false' src="/highlight/highlight01.png" alt="Highlight" />
                </div>
            </section>
        </section>
    )
}