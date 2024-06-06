/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './rankingRestaurantSlider.css';
import { Link } from 'react-router-dom';

export function RankingRestaurantSlider({ slides }) {

    return (

        <section className="bestNearRestaurant secondSection-child">

            <h2 className='bestNearRestaurant-title'>Los mejores restaurantes cerca de ti</h2>

            <div>
                <Swiper
                    spaceBetween={40}
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
                                slidesPerView: 1,
                            },
                            200: {
                                slidesPerView: 2,
                            },
                            350: {
                                slidesPerView: 3,

                            },
                            550: {
                                slidesPerView: 5,

                            },
                            800: {
                                slidesPerView: 7,

                            },
                            1100: {
                                slidesPerView: 8,
                            },
                        }
                    }
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={slide.id}>
                            <Link className='top-restaurant-btn-img' to={`/restaurant/${slide.id}`}>
                                {index === 0 && <img src="/principalPage/bestNearRestaurant/gold-reward.png" alt="Gold Frame" className="top-reward" />}
                                {index === 0 && <img src="/principalPage/bestNearRestaurant/gold-frame.png" alt="Gold Frame" className="award-frame" />}
                                {index === 1 && <img src="/principalPage/bestNearRestaurant/silver-frame.png" alt="Silver Frame" className="award-frame" />}
                                {index === 2 && <img src="/principalPage/bestNearRestaurant/bronze-frame.png" alt="Bronze Frame" className="award-frame" />}
                                <img className='restaurant-img' src={slide.img_icon} alt={slide.id} />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

        </section>


    );
}