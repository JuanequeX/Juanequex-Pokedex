import React, { useState } from 'react'

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
    setViewDetails({available: true, pokemonId: pokemonData.id})
  }

  return (
    <div>
      <button onClick={(e) => handlePokemon(e)} onDoubleClick={() => handleDoubleClick()}  >{pokemon.name}</button>
    </div>
  )
}

export default PokedexList
