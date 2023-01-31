import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

function usePokemons() {
  const [pokemons, setPokemons] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  let [,setSearchParams] = useSearchParams();


  useEffect(() => {
    setSearchParams({page: currentPage})
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${getOffSet()}&limit=${getLimit()}`)
    .then((response) => {
      return response.json()
    }).then((data)  => {
      setPokemons(data.results)
    })
    // eslint-disable-next-line
  },[currentPage])

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

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
  }


  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1)
  }

  return { pokemons, currentPage, handleNextPage, handlePreviousPage }
}

export default usePokemons
