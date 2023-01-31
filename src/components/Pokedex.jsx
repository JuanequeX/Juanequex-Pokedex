import React, {useState, useEffect} from 'react'
import PokedexList from './PokedexList'
import PokemonImage from './PokemonImage'
import PokedexLogo from '../assets/pokedex-logo.png'
import { useSearchParams } from 'react-router-dom';

function Pokedex() {
  const [pokemons, setPokemons] = useState([])
  const [selectedPokemon, setSelectedPokemon] = useState({})
  const [selectedPokemonImage, setSelectedPokemonImage] =useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [viewDetails, setViewDetails] = useState({available: false})
  let [searchParams, setSearchParams] = useSearchParams();


  useEffect(() => {
    setSearchParams({page: currentPage})
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${getOffSet()}&limit=${getLimit()}`)
    .then((response) => {
      return response.json()
    }).then((data)  => {
      setPokemons(data.results)
    })
  },[currentPage])

  useEffect(() => {
    setSelectedPokemonImage(selectedPokemon?.sprites?.front_default)
  },[selectedPokemon])

  const handleNextPage = () => {
    setSearchParams({page: currentPage + 1})
    setCurrentPage(currentPage + 1)
  }

  const handlePreviousPage = () => {
    setSearchParams({page: currentPage - 1})
    setCurrentPage(currentPage - 1)
  }

  const getOffSet = () => {
    if (currentPage === 1) {
      return 0
    }
    return (currentPage - 1 ) * 20
  }

  const getLimit = () => {
    if (currentPage === 8) {
      return 10
    }
    return 20
  }

  return (
    <div className='pokedex-container'>
      <div className='pokedex-container__pokedex'>
        <div className='pokedex-container__pokedex__image-cont'>
          <img className='pokedex-container__pokedex__logo' src={PokedexLogo}/>
          {selectedPokemonImage && <PokemonImage selectedPokemonImage={selectedPokemonImage}/>}
        </div>
        { !viewDetails.available && (
            <div className='pokedex-container__pokedex__list-cont'>
              {pokemons.map((pokemon, index) => <PokedexList key={index} pokemon={pokemon} setViewDetails={setViewDetails} setSelectedPokemon={setSelectedPokemon} />)}
            </div>
        )}
        { viewDetails.available && (
          <div className='pokedex-container__pokedex__list-cont'>
            <h1>{viewDetails.pokemonData.id}</h1>
            <h1>{viewDetails.pokemonData.name}</h1>
            <button onClick={()=> setViewDetails({available: false})}>Back</button>
          </div>
        )}

      </div>
      <div>
        { currentPage > 1 && (<button onClick={() => handlePreviousPage()}>Previous</button> )}
        { currentPage < Math.ceil(150 / 20) && (<button onClick={() => handleNextPage()}>next</button>)}
      </div>
    </div>
  )
}

export default Pokedex
