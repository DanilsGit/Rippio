/* eslint-disable react/prop-types */
// import { register } from 'swiper/element/bundle';
// register Swiper custom elements
// register();

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../../css/secondSectionBody.css'

export function SecondSectionBody({ slides }) {

    return (

        <section className="bestNearRestaurant secondSection-child">


            <Swiper
                spaceBetween={50}
                navigation={true}
                // loop={false}
                // autoplay={
                //     {
                //         delay: 1000,
                //     }
                
                // }
                breakpoints={
                    {
                        0: {
                            slidesPerView: 2,
                        },
                        350: {
                            slidesPerView: 3,

                        },
                        550: {
                            slidesPerView: 4,

                        },
                        800: {
                            slidesPerView: 5,

                        },
                        1100: {
                            slidesPerView: 6,
                        },
                    }
                }
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.image}>
                        <img src={slide.image} alt={slide.title} />
                    </SwiperSlide>
                ))}
            </Swiper>

        </section>


    );
}