import CarouselImage from "./CarouselImage";
import slides from '../../utilities/carrousel.json'
import { Categories } from "./Categories";
import '../../css/firstSectionBody.css';
import highlight from '/principalPage/highlight/highlight01.png';

export function FirstSectionBody() {
    return (
        <section className="MainContent-bodySection-firstSection">

            <CarouselImage slides={slides} />

            <Categories />
            
            <section className="Highlight firstSection-child">
                <h2> Destacado en tu <span>Zona</span></h2>
                <div className="Highlight-imgContainer">
                    <img draggable='false' src={highlight} alt="Highlight" />
                </div>
            </section>
        </section>
    )
}