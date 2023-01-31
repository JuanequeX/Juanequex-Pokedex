import React, { useState } from 'react'
import Pokeball from '../assets/pokeball.png'

function PokedexList({ pokemon, setSelectedPokemon, setViewDetails }) {
  const [pokemonData, setPokemonData] = useState()

  const handlePokemon = (e) => {
    fetch(pokemon.url)
    .then((response) => {
      return  response.json()
    })
    .then((data) => {
      setSelectedPokemon(data)
      setPokemonData(data)
    })
  }

  const handleDoubleClick = () => {
    setViewDetails({available: true, pokemonData: pokemonData})
  }

  return (
    <div onClick={(e) => handlePokemon(e)} onDoubleClick={() => handleDoubleClick()} className='list-container'>
      <a className="list-container__pokemon-name">{pokemon.name}</a>
      <img className='list-container__pokeball' src={Pokeball} alt="" />
    </div>
  )
}

export default PokedexList
