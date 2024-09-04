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
            
            <div className='bestNearRestaurant-slider-container'>
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
                                slidesPerView: 4,

                            },
                            550: {
                                slidesPerView: 6,

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
                                {index === 0 && <img src="https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/HomePage%2FTopRestaurants%2Fgold-reward.png?alt=media&token=1c48d4be-0269-4795-94b3-38ea0310de70" alt="Gold Frame" className="top-reward" />}
                                {index === 0 && <img src="https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/HomePage%2FTopRestaurants%2Fgold-frame.png?alt=media&token=13d9c078-707a-4d2d-bd23-171dd23a4223" alt="Gold Frame" className="award-frame" />}
                                {index === 1 && <img src="https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/HomePage%2FTopRestaurants%2Fsilver-frame.png?alt=media&token=24e80552-941d-496b-a992-7bee0235ef5e" alt="Silver Frame" className="award-frame" />}
                                {index === 2 && <img src="https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/HomePage%2FTopRestaurants%2Fbronze-frame.png?alt=media&token=15b4b719-1eaf-4d1d-a603-f995149bcf60" alt="Bronze Frame" className="award-frame" />}
                                <img className='restaurant-img' src={slide.img_icon} alt={slide.id} />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

        </section>


    );
}