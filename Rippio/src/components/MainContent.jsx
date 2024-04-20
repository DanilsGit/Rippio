import  { HeaderMainContent }  from './HeaderMainContent';
import { BodyMainContent } from './BodyMainContent';
import { Footer } from './footer/Footer';

export function MainContent() {

    return (
        <main className='mainContent'>
            <HeaderMainContent />
            <BodyMainContent />
            <Footer />
        </main>
    )
}