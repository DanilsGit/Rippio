import { FirstSectionBody } from '../components/firstSection/FirstSectionBody'
import '../css/bodyMainContent.css'
import '../css/firstSection.css'
import { SecondSectionBody } from './secondSection/SecondSectionBody'

export function BodyMainContent() {
    return (
        <section className='MainContent-bodySection'>
            <section className='MainContent-bodySection-content'>
                <FirstSectionBody />
                <SecondSectionBody />
            </section>
        </section>
    )
}