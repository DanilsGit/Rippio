import { FirstSectionBody } from '../components/promoSection/FirstSectionBody'
import { SecondSectionBody } from './section2/SecondSectionBody'
import { ThirdSectionBody } from './section3/ThirdSectionBody'
import { FourthSectionBody } from './section4/FourthSectionBody'

import '../css/bodyMainContent.css'
import '../css/secondSectionBody.css'
import slides from '../utilities/bestNearRestaurant.json'
import { SearchSection } from './searchSection/SearchSection'

export function BodyMainContent() {
    return (
        <section className='MainContent-bodySection'>
            <section className='MainContent-bodySection-content'>
                <SearchSection />
                <FirstSectionBody />
                <SecondSectionBody slides={slides} />
                <ThirdSectionBody />
            </section>
            <FourthSectionBody />
        </section>
    )
}