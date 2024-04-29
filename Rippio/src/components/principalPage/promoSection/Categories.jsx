/* eslint-disable react/prop-types */
import { CurveText } from "./CurveText";
import './categories.css';

export function Categories({items}){
    return (
        <section className="Categories firstSection-child">
        <header className="Categories-header">
            <h2>¿Aún no te decides?</h2>
            <p>Explora las categorías más populares</p>
        </header>
        <section className="Categories-content">
            {items.map((item) => (
                <a href="#" className="Categories-content-item" key={item.image}>
                    <CurveText>{item.title}</CurveText>
                    <img draggable='false' className="Categories-content-item-img" src={item.image} alt={item.title} />
                </a>
            ))}
        </section>
    </section>
    );
}