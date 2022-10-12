/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, {lazy, Suspense} from 'react';
import { useEffect, useState } from 'react';
const PokemonCard = lazy(() => import('./components/Pokemon'));

type PokemonList = {
  url: string;
};

export default function App() {
  const [pokemonList, setPokemonList] = useState<PokemonList[]>();

  const getPokemonList = async () => {
    try { 
      const { data } = await axios.get(
        'https://pokeapi.co/api/v2/pokemon?limit=151'
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let mounted = true;
    getPokemonList().then(data => {
      if (mounted) {
        setPokemonList(data.results);
      }
    });
    return () => {
      mounted = false;
    }
  }, []);

  return (
    <div className="bg-gray-700 min-h-screen w-full">
      <main className="text-white flex gap-2 flex-wrap">
        <Suspense fallback={<div>Loading...</div>}>
        {pokemonList &&
          pokemonList.map((pokemon) => <PokemonCard url={pokemon.url} />)}
          </Suspense>
      </main>
    </div>
  );
}
