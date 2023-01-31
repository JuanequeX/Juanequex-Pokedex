import React from 'react'

function PokemonImage({selectedPokemonImage}) {
  console.log(selectedPokemonImage)
  return (
    <div>
      <img src={selectedPokemonImage} alt="Pokemon" />
    </div>
  )
}

export default PokemonImage
