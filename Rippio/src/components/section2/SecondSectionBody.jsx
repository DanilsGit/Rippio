/* eslint-disable react/prop-types */


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../../css/secondSectionBody.css'

export function SecondSectionBody({ slides }) {


    let slidesOrdenados = slides.sort((a, b) => b.score - a.score);


    return (

        <section className="bestNearRestaurant secondSection-child">

            <h2 className='bestNearRestaurant-title'>Los mejores restaurantes cerca de ti</h2>

            <div>
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
                    {slidesOrdenados.map((slide, index) => (
                        <SwiperSlide key={slide.image}>
                        {index === 0 && <img src="/principalPage/bestNearRestaurant/gold-reward.png" alt="Gold Frame" className="top-reward" />}
                        {index === 0 && <img src="/principalPage/bestNearRestaurant/gold-frame.png" alt="Gold Frame" className="award-frame" />}
                        {index === 1 && <img src="/principalPage/bestNearRestaurant/silver-frame.png" alt="Silver Frame" className="award-frame" />}
                        {index === 2 && <img src="/principalPage/bestNearRestaurant/bronze-frame.png" alt="Bronze Frame" className="award-frame" />}
                            <img className='restaurant-img' src={slide.image} alt={slide.title} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

        </section>


    );
}