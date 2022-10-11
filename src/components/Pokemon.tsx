/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useState } from 'react';

type Props = {
  url: string;
};

type Pokemon = {
  name: string;
  sprites: any;
};

export default function Button(props: Props) {
  const [pokemonList, setPokemonList] = useState<Pokemon>();

  const getPokemonInfo = async () => {
    const { data } = await axios.get(props.url);
    setPokemonList(data);
  };

  useEffect(() => {
    getPokemonInfo();
  }, []);

  return (
    <div className="border-2 border-white max-w-xs flex flex-col justify-center items-center">
      <p className="text-3xl font-semibold">
        {pokemonList?.name.charAt(0).toUpperCase()}
        {pokemonList?.name.slice(1)}
      </p>
      <div className="flex items-center">
        <img
          className="w-1/2 h-full"
          src={pokemonList?.sprites?.front_default}
          alt={pokemonList?.name}
        />
        <img
          className="w-1/2 h-full"
          src={pokemonList?.sprites?.back_default}
          alt={pokemonList?.name}
        />
      </div>
    </div>
  );
}
