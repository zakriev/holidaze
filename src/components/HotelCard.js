import React, {useState, useEffect} from 'react'
import { Card } from 'react-bootstrap'
import Gym from './icons/Gym';
import Pet from './icons/Pet';
import Wifi from './icons/Wifi';
import Heart, {FilledHeart} from './icons/Heart';
import { Link } from 'react-router-dom';

function HotelCard({hotel, setFavNum}) {
    const [favourited, setFavourited] = useState(false);
    useEffect(() => {
        const parsedLocalstorage = JSON.parse(localStorage.getItem('favourites'));
        setFavourited(parsedLocalstorage?.find(fav => fav.id === hotel.id));
    }, [hotel.id]);


    const amenities = (amenities) => {
        let icons = [];
        if(amenities.includes('W')) icons.push(<Wifi key="wifi"/>);
        if(amenities.includes('P')) icons.push(<Pet key="pet"/>);
        if(amenities.includes('G')) icons.push(<Gym key="gym"/>);
        return icons;
    }
    const favourite = () => {
        let favs = [];
        if(JSON.parse(localStorage.getItem('favourites'))) {
            favs = JSON.parse(localStorage.getItem('favourites'));
        }
        if(!favs.find(fav => fav.id === hotel.id)) {
            favs?.push(hotel);
            setFavourited(true);
        };
        localStorage.setItem('favourites', JSON.stringify(favs));
        setFavNum(JSON.parse(localStorage.getItem('favourites'))?.length);
    }
    const unfavourite = () => {
        const favs = JSON.parse(localStorage.getItem('favourites'));
        localStorage.setItem('favourites', 
        JSON.stringify(favs
        .filter(fav => fav.id !== hotel.id)));
        setFavourited(false);
        setFavNum(JSON.parse(localStorage.getItem('favourites'))?.length);
    }
    console.log(hotel)
    return (
    <Card key={hotel?.id}>
        {hotel?.Image?.length > 0 && <Card.Img variant="top" src={hotel.Image[0].url} />}
        <Card.Body>
            <Card.Title>{hotel.Name}
             <button className="favourite-btn">
              {favourited ? <FilledHeart onClick={unfavourite} /> : <Heart onClick={favourite}/>}
              </button>
            </Card.Title>
            {hotel.Amenities && <Card.Subtitle>{amenities(hotel.Amenities)}</Card.Subtitle>}
              <div className="hotel-price">{hotel.Price}<span> NOK Per night</span></div>
            <Card.Text>{hotel.Description}</Card.Text>
            <div className="card-bottom-buttons">
                <Card.Link className="btn btn-primary" href={"/hotel/" + hotel.id}>READ MORE</Card.Link>
            <Card.Link className="btn btn-primary" href={"/enquiry/" + hotel.id}>BOOK NOW</Card.Link>
                </div>
        </Card.Body>
    </Card>
    )
}

export default HotelCard
