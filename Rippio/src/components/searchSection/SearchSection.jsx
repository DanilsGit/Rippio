import '../../css/searchSection.css'
import food1 from '/searchSection/food1.png';
import food2 from '/searchSection/food2.png';
import food3 from '/searchSection/food3.png';
import food4 from '/searchSection/food4.png';
import foodBackground from '/searchSection/foodbackground.png';

export function SearchSection() {
    return (
        <section className='SearchSection MainContent-bodySection-search'>
            <section className="firstSearchSection">
                <header className="location">
                    <img className='locationImg' src="/icons/locationIcon.png" alt="location"></img>
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
                            <img src="/icons/searchIcon.png" alt="searchIcon"></img>
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