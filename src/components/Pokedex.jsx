import React, {useState, useEffect} from 'react'
import PokedexList from './PokedexList'
import PokemonImage from './PokemonImage'
import PokedexLogo from '../assets/pokedex-logo.png'
import { useSearchParams } from 'react-router-dom';

function Pokedex() {
  const [pokemons, setPokemons] = useState([])
  const [selectedPokemon, setSelectedPokemon] = useState({})
  const [selectedPokemonImage, setSelectedPokemonImage] = useState(false)
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

  const goBack = () => {
    setViewDetails({available: false})
    setSelectedPokemonImage(!selectedPokemonImage)
  }

  return (
    <div className='pokedex-container'>
      <div className='pokedex-container__pokedex'>
        <div className='pokedex-container__pokedex__image-cont'>
          <h2 className='pokedex-container__pokedex__title'>Juanequex Pokedex</h2>
          <img className='pokedex-container__pokedex__logo' src={PokedexLogo}/>
          {selectedPokemonImage && <PokemonImage selectedPokemonImage={selectedPokemonImage}/>}
          {!viewDetails.available && (
            <div className='pagination-button-container'>
              { currentPage > 1 && (<button className='pagination-button-container__previous' onClick={() => handlePreviousPage()}>Previous</button> )}
              { currentPage < Math.ceil(150 / 20) && (<button className='pagination-button-container__next' onClick={() => handleNextPage()}>next</button>)}
            </div>
          )}
        </div>
        { !viewDetails.available && (
            <div className='pokedex-container__pokedex__list-cont'>
              {pokemons.map((pokemon, index) => <PokedexList key={index} pokemon={pokemon} setViewDetails={setViewDetails} setSelectedPokemon={setSelectedPokemon} />)}
            </div>
        )}
        { viewDetails.available && (
          <div className='skill'>
            <div className='skill__type'>
              <span>Type:</span>
              <div className='skill__type__types'>
                {viewDetails.pokemonData.types.map((type, key) => <p key={key}>⌇✶ {type.type.name}</p>)}
              </div>
            </div>
            <div className='skill__trait'>
              <p className='skill__trait__number'>{`Number: ${viewDetails.pokemonData.id}`}</p>
              <p className='skill__trait__name'>{`Name: ${viewDetails.pokemonData.name}`}</p>
              <p className='skill__trait__height'>{`Height: ${viewDetails.pokemonData.height}`}</p>
              <p className='skill__trait__weight'>{`Weight: ${viewDetails.pokemonData.weight}`}</p>
            </div>
            <p className='skill__stats-title'>stats 📊</p>
            <div className='skill__stats-container'>
              <div className='skill__stats-container__stats'>
                {viewDetails.pokemonData.stats.map((stat, key) => <p key={key}>{stat.stat.name}</p>)}
              </div>
              <div className='skill__stats-container__ranges-container'>
                {viewDetails.pokemonData.stats.map((stat, key) =>
                  <div key={key} className='skill__stats-container__ranges-container__progress' >
                    <div className='skill__stats-container__ranges-container__progress-bar' style={{width:`${stat.base_stat}%`}} >
                      <span className='skill__stats-container__ranges-container__progress-bar-text'>{stat.base_stat}%</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className='skill__ability-container'>
              <h2>Abilities</h2>
              <div className='skill__type__types'>
                {viewDetails.pokemonData.abilities.map((ability, key) => <p key={key}>⌇✶ {ability.ability.name}</p>)}
              </div>
            </div>
               <button className='back-button' onClick={()=> goBack()}>Back</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Pokedex
