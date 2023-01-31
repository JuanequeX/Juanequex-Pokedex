import React from 'react'

function PokemonDetails({pokemon, resetPokemon}) {
  return (
    <div className='skill'>
      <div className='skill__type'>
        <span>Type:</span>
        <div className='skill__type__types'>
          {pokemon.types.map((type, key) => <p key={key}>⌇✶ {type.type.name}</p>)}
        </div>
      </div>
      <div className='skill__trait'>
        <p className='skill__trait__number'>{`Number: ${pokemon.id}`}</p>
        <p className='skill__trait__name'>{`Name: ${pokemon.name}`}</p>
        <p className='skill__trait__height'>{`Height: ${pokemon.height}`}</p>
        <p className='skill__trait__weight'>{`Weight: ${pokemon.weight}`}</p>
      </div>
      <p className='skill__stats-title'>stats 📊</p>
      <div className='skill__stats-container'>
        <div className='skill__stats-container__stats'>
          {pokemon.stats.map((stat, key) => <p key={key}>{stat.stat.name}</p>)}
        </div>
        <div className='skill__stats-container__ranges-container'>
          {pokemon.stats.map((stat, key) =>
            <div key={key} className='skill__stats-container__ranges-container__progress' >
              <div className='skill__stats-container__ranges-container__progress-bar' style={{width:`${stat.base_stat > 100 ? 100 : stat.base_stat}%`}} >
                <span className='skill__stats-container__ranges-container__progress-bar-text'>{stat.base_stat}%</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='skill__ability-container'>
        <h2>Abilities</h2>
        <div className='skill__type__types'>
          {pokemon.abilities.map((ability, key) => <p key={key}>⌇✶ {ability.ability.name}</p>)}
        </div>
      </div>
        <button className='back-button' onClick={resetPokemon}>Back</button>
    </div>
  )
}

export default PokemonDetails
