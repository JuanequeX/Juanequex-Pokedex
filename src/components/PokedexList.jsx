import React, { useState } from 'react'

function PokedexList({ pokemon, setSelectedPokemon }) {

  const handlePokemon = (e) => {
    console.log(e)
    console.log(e)

    fetch(pokemon.url)
    .then((response) => {
      return  response.json()
    })
    .then((data) => {
      setSelectedPokemon(data)
    })
  }

  const handleDoubleClick = (e) => {
    console.log("Le di doble click jaja xd")
    alert('HOLALALALALALA')
  }

  return (
    <div>
      <button onClick={(e) => handlePokemon(e)} onDoubleClick={handleDoubleClick}  >{pokemon.name}</button>
    </div>
  )
}

export default PokedexList
