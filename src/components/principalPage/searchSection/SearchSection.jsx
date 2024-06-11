import './searchSection.css'
import locationIcon from '/principalPage/icons/locationIcon.png';
import searchIcon from '/principalPage/icons/searchIcon.png';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export function SearchSection() {

    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();


    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };


    return (
        <section className='SearchSection MainContent-bodySection-search'>
            <section className="firstSearchSection">
                <header className="location">
                    <img draggable='false' className='locationImg' src={locationIcon} alt="location"></img>
                    <p>Tuluá, Valle del Cauca</p>
                </header>
                <section className='searchFormSection'>
                    <div className='searchFormInfo'>
                        <h2 className='searchFormTitle'>¿Qué te apetece comer hoy?</h2>
                        <p className='searchFormP'>Descubre restaurantes que están cerca de ti</p>
                    </div>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        searchTerm.trim() && navigate(`/searchpage/${searchTerm}`)
                    }} className='Form-container'>
                        <input
                            className='FormSearchText'
                            type="text"
                            autoComplete='off'
                            value={searchTerm}
                            onChange={handleInputChange}
                        />
                        <button className='FormSearchBtn'>
                            <img src={searchIcon} alt="searchIcon"></img>
                        </button>
                    </form>
                </section>
            </section>
            <section className="secondSearchSection">
                <img draggable='false'  className='secondSearchSection-img' src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/HomePage%2FAnimationSearch%2Fburger.png?alt=media&token=81cb53a2-ee9e-4418-be80-371e72a3b4a4' alt="foodIcon"></img>
                <img draggable='false' className='secondSearchSection-img' src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/HomePage%2FAnimationSearch%2Fsalchipapa.png?alt=media&token=36fb0abf-cc9d-4275-b946-bf4538a29b7e' alt="foodIcon"></img>
                <img draggable='false' className='secondSearchSection-img' src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/HomePage%2FAnimationSearch%2Fburrito.png?alt=media&token=666db319-3c35-425b-b739-856ef91234c1' alt="foodIcon"></img>
                <img draggable='false' className='secondSearchSection-img' src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/HomePage%2FAnimationSearch%2Fsushi.png?alt=media&token=df46d08b-cae1-4661-800b-1ab28dd310fd' alt="foodIcon"></img>
                <img draggable='false' className='secondSearchSection-img' src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/HomePage%2FAnimationSearch%2Ffoodbackground.png?alt=media&token=c30f626c-43b4-474d-aedf-4ba8e3a1cf5d' alt="foodIcon"></img>
            </section>
        </section>
    )
}