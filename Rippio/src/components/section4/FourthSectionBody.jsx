import '../../css/fourthSectionBody.css'
import { PlanSection } from './PlanSection'
import { TeamSection } from './TeamSection'

export function FourthSectionBody() {
    return (
        <section className="businessSection">
            <h2 className='businessSection-title'>Únete a <span>RIPPIO</span></h2>
            <PlanSection />
            <TeamSection />
        </section>
    )
}