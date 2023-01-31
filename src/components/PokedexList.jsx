import React, { useState } from 'react'

function PokedexList({ pokemon, setSelectedPokemon, setViewDetails }) {

  const handlePokemon = (e) => {
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
      <button onClick={(e) => handlePokemon(e)} onDoubleClick={() => setViewDetails(true)}  >{pokemon.name}</button>
    </div>
  )
}

export default PokedexList
