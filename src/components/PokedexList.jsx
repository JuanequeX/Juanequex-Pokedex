import React, { useState } from 'react'
import Pokeball from '../assets/pokeball.png'

function PokedexList({ pokemon, setPokemon }) {
  const [pokemonData, setPokemonData] = useState()

  const handlePokemon = () => {
    if (!pokemonData) {
      fetch(pokemon.url)
      .then((response) => {
        return  response.json()
      })
      .then((data) => {
        setPokemon({showDetails: false, ...data})
        setPokemonData(data)
      })
    }
  }

  const handleDoubleClick = () => {
    setPokemon({showDetails: true, ...pokemonData})
  }

  return (
    <div onClick={handlePokemon} onDoubleClick={handleDoubleClick} className='list-container'>
      <p className="list-container__pokemon-name">{pokemon.name}</p>
      <img className='list-container__pokeball' src={Pokeball} alt="" />
    </div>
  )
}

export default PokedexList
