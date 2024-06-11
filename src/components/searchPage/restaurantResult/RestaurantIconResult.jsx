/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import './restaurantIconResult.css'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export function RestaurantIconResult({ results }) {


    return (
        <div className='searchPage-iconsContainer'>
            <Swiper
                spaceBetween={40}
                navigation={true}
                loop={true}
                autoplay={
                    {
                        delay: 1000,
                    }
                }
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
                            slidesPerView: 9,
                        },
                    }
                }
            >
                {results.map((restaurant) => (
                    <SwiperSlide key={restaurant.id}>
                        <Link to={`/restaurant/${restaurant.id}`} key={restaurant.id} className='searchPage-iconsContainer-link'>
                            <img key={restaurant.id} className='searchPage-iconsContainer-img' src={restaurant.img_icon} alt={restaurant.nombre} />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}