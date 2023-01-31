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
  let [searchParams, setSearchParams] = useSearchParams();

  // let URL = 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20'

  useEffect(() => {
    setSearchParams({page: currentPage})
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${getOffSet()}&limit=20`)
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
    // if ("si exite el parametro page en la URL ") {
    //   setCurrentPage(paginationParam)
    //   return paginationParam * 20
    // }
    return currentPage * 20
  }

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
        { currentPage > 1 && (<button onClick={() => handlePreviousPage()}>Previous</button> )}
        { currentPage < Math.ceil(150 / 20) && (<button onClick={() => handleNextPage()}>next</button>)}
      </div>
    </div>
  )
}

export default Pokedex
