import './searchSection.css'
import foodBackground from '/principalPage/searchSection/foodbackground.png';
import locationIcon from '/principalPage/icons/locationIcon.png';
import searchIcon from '/principalPage/icons/searchIcon.png';

import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useImage } from '../../../hooks/useImage';


export function SearchSection() {

    const [searchTerm, setSearchTerm] = useState('');

    const {image: food1} = useImage('/HomePage/AnimationSearch/burger.png');
    const {image: food2} = useImage('/HomePage/AnimationSearch/burrito.png');
    const {image: food3} = useImage('/HomePage/AnimationSearch/sushi.png');
    const {image: food4} = useImage('/HomePage/AnimationSearch/brocheta.png');


    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };


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
                    <form onSubmit={() => {
                        document.querySelector('.FormSearchBtn').click();
                    }} className='Form-container'>
                        <input
                            className='FormSearchText'
                            type="text"
                            name="query"
                            autoComplete='off'
                            value={searchTerm}
                            onChange={handleInputChange}
                        />
                        <Link to={
                            searchTerm === '' ?
                                '/'
                                :
                                `/searchpage/${searchTerm}`
                        } className='FormSearchBtn'>
                            <img src={searchIcon} alt="searchIcon"></img>
                        </Link>
                    </form>
                </section>
            </section>
            <section className="secondSearchSection">
                <img draggable='false'  className='secondSearchSection-img' src={food1} alt="foodIcon"></img>
                <img draggable='false' className='secondSearchSection-img' src={food2} alt="foodIcon"></img>
                <img draggable='false' className='secondSearchSection-img' src={food3} alt="foodIcon"></img>
                <img draggable='false' className='secondSearchSection-img' src={food4} alt="foodIcon"></img>
                <img draggable='false' className='secondSearchSection-img' src={foodBackground} alt="foodIcon"></img>
            </section>
        </section>
    )
}