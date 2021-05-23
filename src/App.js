import React, {useState, useEffect} from 'react'
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './sass/style.scss';
import Hotels from './components/pages/Hotels';
import Admin from './components/pages/Admin'
import 'bootstrap/dist/css/bootstrap.min.css';
import Hotel from './components/pages/Hotel';
import Search from './components/pages/Search';
import Favourites from './components/pages/Favourites';
import { AuthProvider } from './components/context/Auth';
import SignIn from "./components/pages/SignIn";
import Enquiry from './components/pages/Enquiry';



function App() {
  const [favNum, setFavNum] = useState(0);
  return (
    <AuthProvider>
     <Router>
      <Navbar favNum={favNum} /> 
      <main>
        <Switch>
        <Route path="/" exact><Home setFavNum={setFavNum}/></Route>
        <Route path="/admin" exact><Admin /></Route>
        <Route path="/hotels" exact><Hotels setFavNum={setFavNum} /></Route>
        <Route path="/hotel/:id" exact><Hotel /></Route>
        <Route path="/search/:search" exact><Search setFavNum={setFavNum}/></Route>
        <Route path="/favourites" exact><Favourites setFavNum={setFavNum}/></Route>
        <Route path="/signin" exact><SignIn />
        </Route>
        <Route path='/enquiry/:id'>
        <Enquiry />
        </Route>
        </Switch>
        </main> 
    </Router>
    </AuthProvider>
    
  );
}

export default App
