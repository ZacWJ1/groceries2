import {React, useState, useEffect } from "react";
import NavBar from './components/navbar'
import {BrowserRouter as Router,Routes, Route, Navigate} from 'react-router-dom'
import './App.css'
import './index.css'
import HomePage from './pages/homepage';
import NewRecipePage from './pages/newrecipepage';
import RecipePage from './pages/recipepage';
import Loginpage from './pages/loginpage';
import Login from './pages/login';
import SignUp from './pages/signup';
import axios from 'axios';
import Home from "./pages/home";

import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios.get('https://groceries2backend.onrender.com/user', { withCredentials: true })
        .then(response => {
            if (response.data.user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        })
        .catch(() => setIsLoggedIn(false));
}, []);
  
  
  return (
    <Router>
    <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
    
    <Routes>
    
    <Route path='/login' element={isLoggedIn ? <Navigate to="/home" /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
    <Route path="/signup" element={isLoggedIn ? <Navigate to="/home" /> : <SignUp setIsLoggedIn={setIsLoggedIn} />} />
    <Route path='/items/new' element={<NewRecipePage/>}/>
    <Route path='/items/:id' element={<RecipePage/>}/>
    <Route path='/home' element={<HomePage />} />
    </Routes>
    </Router>
  );
}

export default App;
//