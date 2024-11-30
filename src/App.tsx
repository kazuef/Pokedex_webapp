import React, { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import PokenmonThumbnails from './components/PokenmonThumbnails';
import pokemonJson from "./pokemon.json";
import pokemonTypeJson from "./pokemonType.json";

function App() {

  // 型定義
  type PokemonData = {
    id: number;
    name: string;
    iconImage: string;
    image: string;
    type: string;
    jpName: string;
    jpType: string;
  };

  type ApiPokemon = {
    name: string;
    url: string;
  }

  type PokemonJson = {
    ja: string;
    en: string;
  };


  // 検索バー関係
  // const [searchResults, setSearchResults] = useState<string>('');
  const [query, setQuery] = useState<boolean>(false);
  
  // ポケモン関係
  const initPokemonAllUrl = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";
  const [pokemonAllUrl, setPokemonAllUrl] = useState<string>(initPokemonAllUrl);
  const [allPokemons, setAllPokemons] = useState<PokemonData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const getAllPokemons = (url = pokemonAllUrl) => {
    setIsLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setPokemonAllUrl(data.next);
        createPokemonObject(data.results);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }
  

  const createPokemonObject = (results: ApiPokemon[]) => {
    results.forEach(pokemon => {
      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      fetch(pokemonUrl)
        .then(res => res.json())
        .then(async data => {
          const _image = data.sprites.other["official-artwork"].front_default;
          const _iconImage = data.sprites.other.dream_world.front_default;
          const _type = data.types[0].type.name
          const japanese = await translateToJapanese(data.name, _type);
          const newList = {
            id: data.id,
            name: data.name,
            iconImage: _iconImage,
            image: _image,
            type: _type,
            jpName: japanese.name,
            jpType: japanese.type
          }

          setAllPokemons(currentList => [...currentList, newList].sort((a, b) => a.id - b.id));
        })
    })
  }


  const translateToJapanese = async (name: string, type: string) => {
    const jpName = await pokemonJson.find(
      (pokemon: PokemonJson) => pokemon.en.toLowerCase() === name
    )?.ja || name;
    const jpType = await pokemonTypeJson[type as keyof typeof pokemonTypeJson] ?? type;
    return {name: jpName, type: jpType};
  }


  useEffect(() => {
    getAllPokemons();
  }, [])


  const handleSearch = (query: string) => {
    // setSearchResults(query ? `"${query}" の検索結果` : '');

    // queryが空であれば通常通り表示
    if(query === "") {     
      setAllPokemons([]);
      setQuery(false);
      getAllPokemons(initPokemonAllUrl);
    } else {
      setAllPokemons([]);
      setQuery(true);
      const search_result_pokemons = pokemonJson.filter(pokeJson => pokeJson.ja.includes(query))
      search_result_pokemons.forEach(pokemon => {
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon.en.toLowerCase()}`
        fetch(pokemonUrl)
          .then(res => res.json())
          .then(async data => {
            const _image = data.sprites.other["official-artwork"].front_default;
            const _iconImage = data.sprites.other.dream_world.front_default;
            const _type = data.types[0].type.name
            const japanese = await translateToJapanese(data.name, _type);
            const newList = {
              id: data.id,
              name: data.name,
              iconImage: _iconImage,
              image: _image,
              type: _type,
              jpName: japanese.name,
              jpType: japanese.type
            }
            setAllPokemons(currentList => [...currentList, newList].sort((a, b) => a.id - b.id));
          })
      })
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            ポケモン図鑑
          </h1>
          {/* <p className="text-gray-600">
            美しいアニメーションと使いやすいUIを備えた検索バー
          </p> */}
        </div>
        <div className="mb-8">
          <SearchBar 
            onSearch={handleSearch}
            placeholder="キーワードを入力してください..."
          />
        </div>

        {/* {searchResults && (
          <div className="
            mt-8 p-6 bg-white rounded-lg shadow-md
            transform transition-all duration-300 ease-in-out
            animate-fade-in
          ">
            <p className="text-gray-700 text-center">{searchResults}</p>
          </div>
        )} */}

        {/* <div className="">
          <form>
            <input 
              type="text"
              value={pokemonType}
              onChange={handleChange}
            />
            <button type="submit" onClick={filterPokemonType}>さがす</button>
          </form>
        </div> */}
        <div className="pokemon-container">
          <div className="all-container">
            {allPokemons.map((pokemon: PokemonData, index) => (
              <PokenmonThumbnails
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.image}
                iconImage={pokemon.iconImage}
                type={pokemon.type}
                key={index}
                jpName={pokemon.jpName}
                jpType={pokemon.jpType}
              />
            ))}         
          </div>

          {!query && (
            <div>
              {isLoading ? (
                <div className="load-more">now loading...</div>
              ) : (
                <button className="load-more" onClick={() => getAllPokemons(pokemonAllUrl)}>
                  もっとみる！
                </button>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;