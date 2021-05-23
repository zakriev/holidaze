import React, {useState, useEffect} from 'react'
import HotelCard from '../HotelCard';
import Footer from "../../components/Footer";

function Favourites({setFavNum}) {
    const [favourites, setFavourites] = useState(null);
    useEffect(() => {
        setFavourites(JSON.parse(localStorage.getItem('favourites')));
    }, []);
    if(!favourites || favourites.length === 0)
 return <div className="favorites-header">
 <h1>This page is empty!</h1> 
 </div>
 
 return (
        <section className="fav-section">
        <h1> My Favorites</h1>
        <div className="hotels-grid">
             
            {favourites && favourites.map(hotel => <HotelCard setFavNum={setFavNum} hotel={hotel} key={hotel.id} />)}
        </div>
        <Footer />
        </section>

    );
}

export default Favourites
