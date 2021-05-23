import React, {useEffect, useState} from 'react';
import Contact from '../Contact';
import Hero from '../Hero';
import HotelCard from '../HotelCard';
import Footer from "../../components/Footer";

const Home = ({setFavNum}) => {
    const [featuredHotels, setFeaturedHotels] = useState(null);
    const [allHotels, setAllHotels] = useState(null);
    useEffect(() => {
        fetch('https://enigmatic-refuge-63589.herokuapp.com/Accommodations')
        .then(response => response.json())
        .then(data => {
            setAllHotels(data);
            setFeaturedHotels(data.filter(hotel => hotel.Featured))
        });
    }, [])
    return (
        <div className="home-section">
        <Hero  hotels={allHotels}/>
        <h1>Explore </h1>
        <div className="hotels-grid">
            {featuredHotels?.length > 0 && featuredHotels.map(hotel => 
                <HotelCard setFavNum={setFavNum} hotel={hotel} key={hotel.id} />
            )}
        </div>
        <Contact />
        <Footer />
        </div>

       
        )
}
export default Home;