import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import HotelCard from '../HotelCard';

function Search({setFavNum}) {
    const {search} = useParams()
    const [hotels, setHotels] = useState(null);
    useEffect(() => {
        
        fetch('https://enigmatic-refuge-63589.herokuapp.com/Accommodations/')
        .then(response => response.json())
        .then(data => {
            setHotels(data.filter((hotel) => 
                hotel.Name.toLowerCase().includes(search.toLowerCase())
            ));
        });
    }, [search])
    return (
        <div>
           <div className="hotels-grid">
               {hotels?.length > 0 && hotels.map((hotel) => <HotelCard setFavNum={setFavNum} key={hotel.id} hotel={hotel} />)} 
            </div>
        </div>
    )
}

export default Search
