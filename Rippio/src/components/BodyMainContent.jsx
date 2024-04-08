import { FirstSectionBody } from '../components/section1/FirstSectionBody'
import { SecondSectionBody } from './section2/SecondSectionBody'
import { ThirdSectionBody } from './section3/ThirdSectionBody'
import { FourthSectionBody } from './section4/FourthSectionBody'

import '../css/bodyMainContent.css'
import '../css/secondSectionBody.css'
import slides from '../utilities/bestNearRestaurant.json'

export function BodyMainContent() {
    return (
        <section className='MainContent-bodySection'>
            <section className='MainContent-bodySection-content'>
                <FirstSectionBody />
                <SecondSectionBody slides={slides} />
                <ThirdSectionBody />
                <FourthSectionBody />
            </section>
        </section>
    )
}