import React, { useContext } from 'react';
import Heart from './icons/Heart';
import { GoPerson} from "react-icons/go";
import AuthContext from "./context/Auth";
import { HashLink as Link } from 'react-router-hash-link';
import { Navbar } from 'react-bootstrap';

function Bar({ favNum }) {
    
    
    const [auth, setAuth] =useContext(AuthContext)
    const numberOfFavs = localStorage.getItem('favourites')
        ? JSON.parse(localStorage.getItem('favourites')).length : favNum;
    
    
        return (
        <Navbar className="header" expand="sm">
            <Link to='/' className="navbar-logo">
                <img src="/images/Logo2.png" alt="Logo" />
            </Link>
            <Navbar.Toggle aria-controls="navbar" />
            <Navbar.Collapse id="navbar">
                <nav className="navbar-nav">
                    <ul className="navbar-container">
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/hotels'>Accommodations</Link></li>
                        <li><Link to="/#contact">Contact</Link></li>
                        <li className="favs"><Link to='/favourites'><Heart white={true} /><span>{numberOfFavs}</span></Link></li>
                    
                        {auth ? (
                            <>
                    
                        <li><Link to='/admin'>Admin</Link></li>
                        </>
                        ) : (
                            <li className="favs"><Link to='/signin'><GoPerson size={25} white={true} /></Link></li>
                        )}
                        </ul>
                </nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Bar
