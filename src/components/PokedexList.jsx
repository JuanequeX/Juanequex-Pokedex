import React, { useState } from 'react'

function PokedexList({ pokemon, setSelectedPokemon }) {

  const handlePokemon = () => {
    fetch(pokemon.url)
    .then((response) => {
      return  response.json()
    })
    .then((data) => {
      setSelectedPokemon(data)
    })
  }

  return (
    <div>
      <a onClick={() => handlePokemon()}>{pokemon.name}</a>
    </div>
  )
}

export default PokedexList
