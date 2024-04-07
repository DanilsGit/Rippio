/* eslint-disable react/prop-types */
import { CurveText } from "./CurveText";

export function CategoriesContent({ items }) {
    return (
        <section className="Categories-content">

            {items.map((item) => (
                <a href="#" className="Categories-content-item" key={item.image}>
                    <CurveText>{item.title}</CurveText>
                    <img draggable='false' className="Categories-content-item-img" src={item.image} alt={item.title} />
                </a>
            ))}
        </section>
    )
}