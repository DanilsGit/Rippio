import windowIcon from '../icons/windowIcon.png';
import userIcon from '../icons/user.png';
import searchIcon from '../icons/searchIcon.png';

const exampleFood = [
    'Carne...',
    'Pescado...',
    'Comida rápida...',
    'Comida casera...',
    'Comida china...',
    'Comida japonesa...',
    'Comida italiana...',
    'Comida mexicana...',
    'Comida árabe...',
    'Comida india...',
    'Comida vegetariana...',
];

const randomFood = Math.floor(Math.random() * exampleFood.length);

export function MainContent() {


    return (
        <main className='main-content'>
            <header className='main-content-header'>
                <img className='main-content-header-img header-child' src={windowIcon} alt="Rippio" />

                <section className='main-content-header-section header-child'>
                    <textarea
                    placeholder={exampleFood[randomFood]}>
                    </textarea>
                    <a href='#'>
                        <img className='main-content-header-section-img' src={searchIcon} alt="Buscar" />
                    </a>
                </section>

                <div className='header-child'>
                    <a className='main-content-header-link' href='#'>
                        <img className='main-content-header-link-icon' src={userIcon}></img>
                    </a>
                </div>
                
            </header>
            <section>
                
            </section>
        </main>
    )
}