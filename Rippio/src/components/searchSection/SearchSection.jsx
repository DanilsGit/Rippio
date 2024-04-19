import '../../css/searchSection.css'
import food1 from '/principalPage/searchSection/food1.png';
import food2 from '/principalPage/searchSection/food2.png';
import food3 from '/principalPage/searchSection/food3.png';
import food4 from '/principalPage/searchSection/food4.png';
import foodBackground from '/principalPage/searchSection/foodbackground.png';
import locationIcon from '/principalPage/icons/locationIcon.png';
import searchIcon from '/principalPage/icons/searchIcon.png';

export function SearchSection() {
    return (
        <section className='SearchSection MainContent-bodySection-search'>
            <section className="firstSearchSection">
                <header className="location">
                    <img draggable='false' className='locationImg' src={locationIcon} alt="location"></img>
                    <p>Ubicación</p>
                </header>
                <section className='searchFormSection'>
                    <div className='searchFormInfo'>
                        <h2 className='searchFormTitle'>¿Qué te apetece comer hoy?</h2>
                        <p className='searchFormP'>Descubre restaurantes cerca de ti</p>
                    </div>
                    <form className='Form-container'>
                        <input className='FormSearchText' type="text" />
                        <button className='FormSearchBtn'>
                            <img src={searchIcon} alt="searchIcon"></img>
                        </button>
                    </form>
                </section>
            </section>
            <section className="secondSearchSection">
                <img draggable='false' className='secondSearchSection-img' src={food1} alt="foodIcon"></img>
                <img draggable='false' className='secondSearchSection-img' src={food2} alt="foodIcon"></img>
                <img draggable='false' className='secondSearchSection-img' src={food3} alt="foodIcon"></img>
                <img draggable='false' className='secondSearchSection-img' src={food4} alt="foodIcon"></img>
                <img draggable='false' className='secondSearchSection-img' src={foodBackground} alt="foodIcon"></img>
            </section>
        </section>
    )
}