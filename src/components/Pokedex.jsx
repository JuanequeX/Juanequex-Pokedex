import React, {useState, useEffect} from 'react'
import PokedexList from './PokedexList'
import PokemonImage from './PokemonImage'
import PokedexLogo from '../assets/pokedex-logo.png'
import { useLocation, useSearchParams } from 'react-router-dom';

function Pokedex() {
  const [pokemons, setPokemons] = useState([])
  const [selectedPokemon, setSelectedPokemon] = useState({})
  const [selectedPokemonImage, setSelectedPokemonImage] =useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  let [searchParams, setSearchParams] = useSearchParams();
  let location = useLocation();

  let URL = 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20'

  useEffect(() => {
    fetch(`${URL}`)
    .then((response) => {
      return response.json()
    }).then((data)  => {
      setSearchParams({page: currentPage})
      console.log(searchParams.get('page'))
      setPokemons(data.results)
    })
  },[])

  useEffect(() => {
    setSelectedPokemonImage(selectedPokemon?.sprites?.front_default)
  },[selectedPokemon])

  // const handlePagination = () => {
  //   if ("si exite el parametro page en la URL ") {
  //     setCurrentPage(paginationParam)
  //     return paginationParam * 20
  //   }
  //   return currentPage * 20
  // }

  const handleNextPage = () => {
    setCurrentPage(currentPage+1)
  }

  const handlePreviousPage = () => {
    setCurrentPage(currentPage-1)
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
