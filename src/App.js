import React from 'react';
import logo from './logo.svg';
import './App.css';
import PokeListagem from './components/PokeListagem';
import PokeStore from './components/PokeStore';

function App() {
    return ( 
        <div>
            <PokeStore></PokeStore>
        </div>
    );
}

export default App;