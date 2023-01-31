import React, { useState } from 'react'
import Pokeball from '../assets/pokeball.png'

function PokedexList({ pokemon, setViewDetails }) {
  const [pokemonData, setPokemonData] = useState()

  const handlePokemon = () => {
    if (!pokemonData) {
      fetch(pokemon.url)
      .then((response) => {
        return  response.json()
      })
      .then((data) => {
        setViewDetails({available: false, ...data})
        setPokemonData(data)
      })
    }
  }

  const handleDoubleClick = () => {
    setViewDetails({available: true, ...pokemonData})
  }

  return (
    <div onClick={handlePokemon} onDoubleClick={handleDoubleClick} className='list-container'>
      <a className="list-container__pokemon-name">{pokemon.name}</a>
      <img className='list-container__pokeball' src={Pokeball} alt="" />
    </div>
  )
}

export default PokedexList
