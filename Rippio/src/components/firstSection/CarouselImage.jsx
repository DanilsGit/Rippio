/* eslint-disable react/prop-types */
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();


export default function CarouselImage({ slides }) {
    return (
        <section className="Carousel firstSection-child">
            <swiper-container
            slides-per-view="1"
            navigation="true"
            pagination="true">
                {slides.map((slide) => (
                    <swiper-slide key={slide.image}>
                        <img src={slide.image} alt={slide.title} />
                    </swiper-slide>
                ))}
            </swiper-container>
        </section>
    );
}

