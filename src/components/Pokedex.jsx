import React, {useState, useEffect} from 'react'
import PokedexList from './PokedexList'
import PokemonImage from './PokemonImage'
import PokedexLogo from '../assets/pokedex-logo.png'
import { useSearchParams } from 'react-router-dom';

function Pokedex() {
  const [pokemons, setPokemons] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [viewDetails, setViewDetails] = useState({available: false})
  let [,setSearchParams] = useSearchParams();

  const selectedPokemonImage =  viewDetails?.sprites?.front_default || ""

  useEffect(() => {
    setSearchParams({page: currentPage})
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${getOffSet()}&limit=${getLimit()}`)
    .then((response) => {
      return response.json()
    }).then((data)  => {
      setPokemons(data.results)
    })
  },[currentPage])

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const handlePreviousPage = () => {
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
  }

  return (
    <div className='pokedex-container'>
      <div className='pokedex-container__pokedex'>
        <div className='pokedex-container__pokedex__image-cont'>
          <h2 className='pokedex-container__pokedex__title'>Juanequex Pokedex</h2>
          <img className='pokedex-container__pokedex__logo' src={PokedexLogo}/>
          {selectedPokemonImage && <PokemonImage src={selectedPokemonImage}/>}
          {!viewDetails.available && (
            <div className='pagination-button-container'>
              { currentPage > 1 && (<button className='pagination-button-container__previous' onClick={handlePreviousPage}>Previous</button> )}
              { currentPage < Math.ceil(150 / 20) && (<button className='pagination-button-container__next' onClick={handleNextPage}>next</button>)}
            </div>
          )}
        </div>
        { !viewDetails.available && (
            <div className='pokedex-container__pokedex__list-cont'>
              {pokemons.map((pokemon, index) => <PokedexList key={index} pokemon={pokemon} setViewDetails={setViewDetails} />)}
            </div>
        )}
        { viewDetails.available && (
          <div className='skill'>
            <div className='skill__type'>
              <span>Type:</span>
              <div className='skill__type__types'>
                {viewDetails.types.map((type, key) => <p key={key}>⌇✶ {type.type.name}</p>)}
              </div>
            </div>
            <div className='skill__trait'>
              <p className='skill__trait__number'>{`Number: ${viewDetails.id}`}</p>
              <p className='skill__trait__name'>{`Name: ${viewDetails.name}`}</p>
              <p className='skill__trait__height'>{`Height: ${viewDetails.height}`}</p>
              <p className='skill__trait__weight'>{`Weight: ${viewDetails.weight}`}</p>
            </div>
            <p className='skill__stats-title'>stats 📊</p>
            <div className='skill__stats-container'>
              <div className='skill__stats-container__stats'>
                {viewDetails.stats.map((stat, key) => <p key={key}>{stat.stat.name}</p>)}
              </div>
              <div className='skill__stats-container__ranges-container'>
                {viewDetails.stats.map((stat, key) =>
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
                {viewDetails.abilities.map((ability, key) => <p key={key}>⌇✶ {ability.ability.name}</p>)}
              </div>
            </div>
               <button className='back-button' onClick={goBack}>Back</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Pokedex
