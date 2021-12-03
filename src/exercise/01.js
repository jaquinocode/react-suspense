// Simple Data-fetching
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
// 🐨 you'll also need to get the fetchPokemon function from ../pokemon:
import {PokemonDataView, fetchPokemon, PokemonInfoFallback} from '../pokemon'

// 💰 use it like this: fetchPokemon(pokemonName).then(handleSuccess, handleFailure)

let pokemonName = 'pikachu'
// 🐨 create a variable called "pokemon" (using let)
let pokemon = null

// We don't need the app to be mounted to know that we want to fetch the pokemon
// named "pikachu" so we can go ahead and do that right here.

// version w/ promises
const pokemonPromise = fetchPokemon(pokemonName).then(
  pokemonData => {
    pokemon = pokemonData
  },
  error => {
    console.error('Error:', error)
    throw new Error(error)
  },
)

// version w/ async/await
// async function setPokemon() {
//   try {
//     pokemon = await fetchPokemon(pokemonName)
//   } catch (error) {
//     console.error('Error:', error)
//     throw new Error(error)
//   }
// }
// const pokemonPromise = setPokemon()

function PokemonInfo() {
  // 🐨 if there's no pokemon yet, then throw the pokemonPromise
  // 💰 (no, for real. Like: `throw pokemonPromise`)
  if (!pokemon) throw pokemonPromise

  // if the code gets it this far, then the pokemon variable is defined and
  // rendering can continue!
  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

function App() {
  return (
    <div className="pokemon-info-app">
      <div className="pokemon-info">
        {/* 🐨 Wrap the PokemonInfo component with a React.Suspense component with a fallback */}
        <React.Suspense fallback={<PokemonInfoFallback name={pokemonName} />}>
          <PokemonInfo />
        </React.Suspense>
      </div>
    </div>
  )
}

export default App
