import { SearchSection } from '../components/principalPage/searchSection/SearchSection'
import { CarouselImage } from "../components/principalPage/promoSection/CarouselImage";
import { Categories } from "../components/principalPage/promoSection/Categories";

import { RankingRestaurantSlider } from '../components/principalPage/rankingrestaurantslider/RankingRestaurantSlider'
import { MostSearch } from '../components/principalPage/mostSearch/MostSearch'

import { PlanSection } from '../components/principalPage/businessSection/PlanSection'
import { TeamSection } from '../components/principalPage/businessSection/TeamSection'

import { HeaderNav } from '../components/headerNav/HeaderNav';
import { Footer } from '../components/footer/Footer';

import './principalPage.css'

import slidesTopNear from '../utilities/bestNearRestaurant.json'
import slidesCarousel from '../utilities/carrousel.json'
import itemsCategories from '../utilities/categories.json'



export function PrincipalPage() {
    return (
        <main className='mainContent'>
            <HeaderNav />
            <section className='MainContent-bodySection'>
                <section className='MainContent-bodySection-content'>
                    <SearchSection />
                    <section className="MainContent-bodySection-firstSection">
                        <CarouselImage slides={slidesCarousel} />
                        <Categories items={itemsCategories} />
                    </section>
                    <RankingRestaurantSlider slides={slidesTopNear} />
                    <MostSearch />
                </section>
                <section className="businessSection">
                    <h2 className='businessSection-title'>Únete a <span>RIPPIO</span></h2>
                    <PlanSection />
                    <TeamSection />
                </section>
            </section>
            <Footer />
        </main>
    )
}