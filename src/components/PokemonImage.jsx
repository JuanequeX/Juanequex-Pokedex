import React from 'react'

function PokemonImage({ src }) {
  return (
    <img className='pokemon-image' src={src} alt="Pokemon" />
  )
}

export default PokemonImage
