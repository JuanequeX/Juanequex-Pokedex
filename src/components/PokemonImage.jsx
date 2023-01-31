import React from 'react'

function PokemonImage({selectedPokemonImage}) {
  return (
    <img className='pokemon-image' src={selectedPokemonImage} alt="Pokemon" />
  )
}

export default PokemonImage
