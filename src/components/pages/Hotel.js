import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap'
import HotelCard from '../HotelCard';
import {Carousel} from "react-bootstrap";
import Gym from '../icons/Gym';
import Pet from '../icons/Pet';
import Wifi from '../icons/Wifi';

function Hotel() {
    const {id} = useParams();
    const [hotel, setHotel] = useState(null);
    useEffect(() => {
        fetch('https://enigmatic-refuge-63589.herokuapp.com/Accommodations/'+id)
        .then(response => response.json())
        .then(data => {
            setHotel(data);
        });
    }, [id])
    const amenities = (amenities) => {
        let icons = [];
        if(amenities.includes('W')) icons.push(<Wifi key="wifi"/>);
        if(amenities.includes('P')) icons.push(<Pet key="pet"/>);
        if(amenities.includes('G')) icons.push(<Gym key="gym"/>);
        return icons;
    }
    if(!hotel) return null;
    return (
        <div className="details-wrapper">
            <div className="carousel-container">
        <Carousel>
                {hotel.Image.map((img) => <Carousel.Item key={img.id}><img  alt="" src={img.url} /></Carousel.Item>)}
        </Carousel>
        </div> 
    <div className="details-container">
        <h1> {hotel.Name}</h1> 
         {hotel.Amenities && <div className="icons-details">{amenities(hotel.Amenities)}</div>}
         <h2>Description</h2>
          <p>{hotel.Description}</p> 
           <h4 className="price-desc"> PRICE: {hotel.Price} <span> NOK Per night</span></h4> 
           <Card.Link className="btn btn-primary" href={"/enquiry/" + hotel.id}>BOOK NOW</Card.Link>
            </div>
        </div>

    )
}

export default Hotel


