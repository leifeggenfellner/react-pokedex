/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useState } from 'react';
import PokemonCard from './components/Pokemon';

type PokemonList = {
  url: string;
};

export default function App() {
  const [pokemonList, setPokemonList] = useState<PokemonList[]>();

  const getPokemonList = async () => {
    const { data } = await axios.get(
      'https://pokeapi.co/api/v2/pokemon?limit=151'
    );
    setPokemonList(data.results);
  };

  useEffect(() => {
    getPokemonList();
  }, []);

  return (
    <div className="bg-gray-700 min-h-screen w-full">
      <header className="text-white flex gap-2 flex-wrap">
        {pokemonList &&
          pokemonList.map((pokemon) => <PokemonCard url={pokemon.url} />)}
      </header>
    </div>
  );
}
