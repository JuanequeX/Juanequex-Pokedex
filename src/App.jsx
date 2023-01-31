import React from 'react';
import './App.css';
import './stylesheets/application.scss'
import Pokedex from './components/Pokedex';

function App() {
  return (
    <div className='main-container'>
     <Pokedex />
    </div>
  );
}

export default App;
