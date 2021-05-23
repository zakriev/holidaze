import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';



const Hero = (props) => {
    const [filteredHotels, setFilteredHotels] = useState(null);
    const [searchString, setSearchString] = useState('');
    const history = useHistory();
    const onSubmit = (e) => {
        history.push(`/search/${searchString}`);
    }

    const onChange = (e) => {
        setSearchString(e.target.value);
        setFilteredHotels(props.hotels.filter((hotel) =>
            hotel.Name.toLowerCase().includes(e.target.value.toLowerCase())
        ));
    }
    return (
        <div className="hero">
            <div className="hero-section-items">
            <h2>Welcome to Bergen</h2>
            <img className="hero__image" src="/images/bergen.jpg" alt="bergen" />
            <img className="logo" src="/images/Logo.png" alt="" />
           
            <form id="search-form" onSubmit={onSubmit}>
                <label>Search for stay in bergen <input onChange={onChange} placeholder="Search.."/></label>
                {searchString?.length > 0 && <ul className="autosuggest">{
                    filteredHotels?.length > 0 &&
                    filteredHotels.map((hotel) =>
                        <li key={hotel.id}><Link to={`/hotel/${hotel.id}`}>{hotel.Name}</Link></li>)}</ul>}
            </form>
        </div>
        </div>
    )
}

export default Hero;