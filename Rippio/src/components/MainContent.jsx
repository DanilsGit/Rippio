import  { HeaderMainContent }  from './HeaderMainContent';
import { BodyMainContent } from './BodyMainContent';

export function MainContent() {

    return (
        <main className='mainContent'>
            <HeaderMainContent />
            <BodyMainContent />
            {/* <FooterMainContent /> */}
        </main>
    )
}