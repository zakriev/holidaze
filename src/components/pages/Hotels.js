import React, {useState, useEffect} from 'react'
import HotelCard from '../HotelCard';
import Footer from "../../components/Footer";


function Hotels({setFavNum}) {
    const [filteredHotels, setFilteredHotels] = useState([]);
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        fetch('https://enigmatic-refuge-63589.herokuapp.com/Accommodations')
        .then(response => response.json())
        .then(data => {
            setHotels(data);
            setFilteredHotels(data);
        });
    }, [])
    const onChange = (e) => {
        if(e.target.value === 'all') {
            setFilteredHotels(hotels);
        } else {
            setFilteredHotels(hotels.filter(hotel => hotel.Type === e.target.value));
        }
    }
    return (
        <>
            <h1 className="center-heading">Accomodations</h1>
            <div className="all-categories">
            <select onChange={onChange}>
                <option value="all">All categories</option>
                <option value="hotel">Hotels</option>
                <option value="guesthouse">Guesthose</option>
                <option value="bedandbreakfast">Bed and breakfast</option>
            </select>
            </div>
            <div className="hotels-grid">
                {filteredHotels.length > 0 && filteredHotels.map((hotel) => 
                    <HotelCard setFavNum={setFavNum} key={hotel.id} hotel={hotel} />
                )}
          
            </div>
            <Footer />
        </>
    )
}

export default Hotels


