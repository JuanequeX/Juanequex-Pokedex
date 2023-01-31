import React, {useState, useEffect} from 'react'
import PokedexList from './PokedexList'
import PokemonImage from './PokemonImage'
import PokedexLogo from '../assets/pokedex-logo.png'


function Pokedex() {
  const [pokemons, setPokemons] = useState([])
  const [selectedPokemon, setSelectedPokemon] = useState({})
  const [selectedPokemonImage, setSelectedPokemonImage] =useState(false)
  const [currentPage, setCurrentPage] = useState(1);

  let URL = 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20'

  useEffect(() => {
    fetch(`${URL}`)
    .then((response) => {
      return response.json()
    }).then((data)  => {
      setPokemons(data.results)
    })
  },[])

  useEffect(() => {
    setSelectedPokemonImage(selectedPokemon?.sprites?.front_default)
  },[selectedPokemon])

  return (
    <div className='pokedex-container'>
      <div className='pokedex-container__pokedex'>
        <div className='pokedex-container__pokedex__image-cont'>
          <img className='pokedex-container__pokedex__logo' src={PokedexLogo}/>
          {selectedPokemonImage && <PokemonImage selectedPokemonImage={selectedPokemonImage}/>}
        </div>
        <div className='pokedex-container__pokedex__list-cont'>
          {pokemons.map((pokemon, index) => <PokedexList key={index} pokemon={pokemon} setSelectedPokemon={setSelectedPokemon} />)}
        </div>
      </div>
      <div>
        <button>next</button>
      </div>
    </div>
  )
}

export default Pokedex
