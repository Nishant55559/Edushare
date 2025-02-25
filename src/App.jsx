import { useState } from 'react'
import './App.css'
import Home from './components/home/home';
import Network from './components/network/network';
import Navbar from './components/navbar/navbar';

function App(){
    return(
        <div>
            <Navbar/>
            <Home/>
            <Network/>

        </div>

    );
    };



export default App
