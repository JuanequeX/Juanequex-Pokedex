import React, {useState} from 'react'
import PokedexList from './PokedexList'
import PokemonImage from './PokemonImage'
import PokedexLogo from '../assets/pokedex-logo.png'
import usePokemons from '../hooks/usePokemons'
import PokemonDetails from './PokemonDetails'

function Pokedex() {
  const {pokemons, currentPage, handleNextPage, handlePreviousPage} = usePokemons()
  const [pokemon, setPokemon] = useState({showDetails: false})
  const selectedPokemonImage =  pokemon?.sprites?.front_default || ""

  const resetPokemon = () => {
    setPokemon({showDetails: false})
  }

  return (
    <div className='pokedex-container'>
      <div className='pokedex-container__pokedex'>
        <div className='pokedex-container__pokedex__image-cont'>
          <h2 className='pokedex-container__pokedex__title'>Juanequex Pokedex</h2>
          <img alt="Pokedex Logo" className='pokedex-container__pokedex__logo' src={PokedexLogo}/>
          {selectedPokemonImage && <PokemonImage src={selectedPokemonImage}/>}
          {!pokemon.showDetails && (
            <div className='pagination-button-container'>
              { currentPage > 1 && (<button className='pagination-button-container__previous' onClick={handlePreviousPage}>Previous</button> )}
              { currentPage < Math.ceil(150 / 20) && (<button className='pagination-button-container__next' onClick={handleNextPage}>next</button>)}
            </div>
          )}
        </div>
        { !pokemon.showDetails && (
            <div className='pokedex-container__pokedex__list-cont'>
              {pokemons.map((pokemon, index) => <PokedexList key={index} pokemon={pokemon} setPokemon={setPokemon} />)}
            </div>
        )}
        { pokemon.showDetails && (
          <PokemonDetails pokemon={pokemon} resetPokemon={resetPokemon} />
        )}
      </div>
    </div>
  )
}

export default Pokedex
